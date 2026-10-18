import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { 
  UserProfile, Couple, Recipe, Order, OrderStatus, 
  ServeMode, OrderItem, PairRequest, InAppNotification, Language, Category,
  ShoppingListItem
} from '../types';
import { STARTER_RECIPES } from '../data/starterRecipes';
import { translations } from '../i18n/translations';

// Predefined demo couple profiles
export const DEMO_USERS: Record<string, UserProfile> = {
  'user_alex': {
    uid: 'user_alex',
    displayName: 'Алексей',
    email: 'alex@homeorder.app',
    avatar: '👨‍🍳',
    pairCode: 'ALEX26',
    coupleId: 'couple_main',
    partnerUid: 'user_anna',
  },
  'user_anna': {
    uid: 'user_anna',
    displayName: 'Анна',
    email: 'anna@homeorder.app',
    avatar: '👩‍🍳',
    pairCode: 'ANNA88',
    coupleId: 'couple_main',
    partnerUid: 'user_alex',
  },
};

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['ru'];
  
  // User & Couple
  currentUser: UserProfile;
  partner: UserProfile | null;
  couple: Couple | null;
  switchUser: (uid: string) => void;
  unlinkCouple: () => void;
  pairWithCode: (code: string) => boolean;
  
  // Navigation & Modals
  activeTab: 'home' | 'catalog' | 'orders' | 'profile';
  setActiveTab: (tab: 'home' | 'catalog' | 'orders' | 'profile') => void;
  activeModal: string | null;
  openModal: (modal: string, payload?: any) => void;
  closeModal: () => void;
  
  // Recipes & Favorites
  recipes: Recipe[];
  favorites: string[];
  toggleFavorite: (recipeId: string) => void;
  isFavorite: (recipeId: string) => boolean;
  selectedRecipe: Recipe | null;
  setSelectedRecipe: (r: Recipe | null) => void;
  addCustomRecipe: (r: Recipe) => void;
  
  // Cart & Ordering
  cart: Recipe[];
  addToCart: (recipe: Recipe) => void;
  removeFromCart: (recipeId: string) => void;
  clearCart: () => void;
  submitOrder: (serveMode: ServeMode, serveAt: string, comment?: string) => void;
  
  // Orders & Cook Flow
  orders: Order[];
  activeOrder: Order | null;
  selectedOrder: Order | null;
  setSelectedOrder: (order: Order | null) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus, etaMinutes?: number) => void;
  setOrderEta: (orderId: string, etaMinutes: number) => void;
  sendOrderMessage: (orderId: string, text: string) => void;
  sendCounterOffer: (orderId: string, items: OrderItem[], reason?: string) => void;
  respondToCounterOffer: (orderId: string, accepted: boolean) => void;
  repeatOrder: (order: Order) => void;
  
  // Shopping List
  shoppingList: ShoppingListItem[];
  shoppingListSource: string;
  generateShoppingListFromOrder: (order: Order) => void;
  generateShoppingListFromCart: () => void;
  generateShoppingListFromRecipe: (recipe: Recipe) => void;
  toggleShoppingItem: (itemId: string) => void;
  addShoppingItem: (name: string, amount?: string, unit?: string, dishTitle?: string) => void;
  removeShoppingItem: (itemId: string) => void;
  clearCheckedShoppingItems: () => void;
  resetAllShoppingItems: () => void;
  
  // System & Simulator
  viewMode: 'single' | 'split';
  setViewMode: (mode: 'single' | 'split') => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  currentNotification: InAppNotification | null;
  dismissNotification: () => void;
  playAudioChime: (type?: 'chime' | 'timer' | 'order') => void;
  onboardingSeen: boolean;
  setOnboardingSeen: (seen: boolean) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEY_ORDERS = 'homeorder_orders_v1';
const STORAGE_KEY_FAVORITES = 'homeorder_favorites_v1';
const STORAGE_KEY_LANG = 'homeorder_lang_v1';
const STORAGE_KEY_CURRENT_USER = 'homeorder_active_user_v1';
const STORAGE_KEY_COUPLE = 'homeorder_couple_v1';
const STORAGE_KEY_ONBOARDING = 'homeorder_onboarding_done_v1';
const STORAGE_KEY_SHOPPING = 'homeorder_shopping_v1';
const STORAGE_KEY_SHOPPING_SOURCE = 'homeorder_shopping_src_v1';

// Web Audio API Chime Synthesizer
function playWebAudioBeep(type: 'chime' | 'timer' | 'order' = 'chime') {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    
    if (type === 'timer') {
      // Pleasant kitchen timer alarm chime
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.15);
        gain.gain.setValueAtTime(0.25, ctx.currentTime + i * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.15 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.15);
        osc.stop(ctx.currentTime + i * 0.15 + 0.4);
      });
    } else if (type === 'order') {
      // Bell notify
      const freqs = [587.33, 880];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
        gain.gain.setValueAtTime(0.3, ctx.currentTime + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.1);
        osc.stop(ctx.currentTime + idx * 0.1 + 0.55);
      });
    } else {
      // Gentle soft chime
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.22);
    }
  } catch {
    // Ignore audio context errors if blocked by browser policy
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Language
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_LANG);
    return saved === 'en' ? 'en' : 'ru';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY_LANG, lang);
  };

  const t = translations[language];

  // Active user in this tab
  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY_CURRENT_USER) || 'user_alex';
  });

  const currentUser = useMemo(() => {
    return DEMO_USERS[currentUserId] || DEMO_USERS['user_alex'];
  }, [currentUserId]);

  const partnerUid = currentUser.partnerUid;
  const partner = partnerUid ? DEMO_USERS[partnerUid] || null : null;

  const [couple, setCouple] = useState<Couple | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_COUPLE);
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return {
      id: 'couple_main',
      memberIds: ['user_alex', 'user_anna'],
      createdAt: '2026-01-01T00:00:00.000Z',
    };
  });

  // Navigation
  const [activeTab, setActiveTab] = useState<'home' | 'catalog' | 'orders' | 'profile'>('home');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Cart
  const [cart, setCart] = useState<Recipe[]>([]);

  // Recipes & Favorites
  const [recipes, setRecipes] = useState<Recipe[]>(STARTER_RECIPES);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_FAVORITES);
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    // Default favorites for couple
    return ['shakshuka', 'sweet_sour_pork', 'bolognese', 'syrniki', 'carbonara'];
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ORDERS);
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    // Initial sample active order for instant demonstration
    const sampleItem = STARTER_RECIPES[0]; // Shakshuka
    return [
      {
        id: 'ord_sample_1',
        coupleId: 'couple_main',
        createdBy: 'user_alex',
        cookId: 'user_anna',
        status: 'cooking',
        items: [
          {
            recipeId: sampleItem.id,
            title: sampleItem.title,
            timeMinutes: sampleItem.timeMinutes,
            photoUrl: sampleItem.photoUrl,
          }
        ],
        serveMode: 'in30',
        serveAt: 'Через 20 мин (к 11:30)',
        comment: 'С хрустящим поджаренным хлебом, пожалуйста! ❤️',
        etaMinutes: 20,
        etaSetAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        messages: [
          {
            id: 'm1',
            fromUid: 'user_anna',
            text: 'Уже на кухне! Разогреваю сковороду 🍳',
            createdAt: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
          }
        ],
        createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      }
    ];
  });

  // Simulator & Settings
  const [viewMode, setViewMode] = useState<'single' | 'split'>('single');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentNotification, setCurrentNotification] = useState<InAppNotification | null>(null);
  const [onboardingSeen, setOnboardingSeen] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEY_ONBOARDING) === 'true';
  });

  // Shopping List State
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_SHOPPING);
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    // Pre-populate with Shakshuka ingredients from sample order
    const sample = STARTER_RECIPES[0];
    return sample.ingredients.map((ing, idx) => ({
      id: `shop_${sample.id}_${idx}`,
      name: ing.name.ru,
      amount: ing.amount,
      unit: ing.unit.ru,
      dishTitle: sample.title.ru,
      recipeId: sample.id,
      checked: idx === 0,
    }));
  });

  const [shoppingListSource, setShoppingListSource] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY_SHOPPING_SOURCE) || 'Шакшука по-домашнему';
  });

  // Broadcast channel for multi-tab and split-device real-time sync
  useEffect(() => {
    const channel = new BroadcastChannel('homeorder_sync_v1');
    channel.onmessage = (event) => {
      const { type, payload } = event.data;
      if (type === 'SYNC_ORDERS') {
        setOrders(payload.orders);
        if (payload.notify && payload.notifyTarget === currentUserId) {
          triggerNotification(payload.notify);
        }
      } else if (type === 'SYNC_FAVORITES') {
        setFavorites(payload.favorites);
      } else if (type === 'SYNC_COUPLE') {
        setCouple(payload.couple);
      } else if (type === 'SYNC_SHOPPING') {
        setShoppingList(payload.shoppingList);
        if (payload.source) {
          setShoppingListSource(payload.source);
        }
      }
    };
    return () => {
      channel.close();
    };
  }, [currentUserId]);

  const broadcastOrders = useCallback((updatedOrders: Order[], notify?: InAppNotification, notifyTarget?: string) => {
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(updatedOrders));
    try {
      const channel = new BroadcastChannel('homeorder_sync_v1');
      channel.postMessage({
        type: 'SYNC_ORDERS',
        payload: { orders: updatedOrders, notify, notifyTarget },
      });
      channel.close();
    } catch {}
  }, []);

  const broadcastFavorites = useCallback((newFavs: string[]) => {
    localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(newFavs));
    try {
      const channel = new BroadcastChannel('homeorder_sync_v1');
      channel.postMessage({
        type: 'SYNC_FAVORITES',
        payload: { favorites: newFavs },
      });
      channel.close();
    } catch {}
  }, []);

  const playAudioChime = useCallback((type: 'chime' | 'timer' | 'order' = 'chime') => {
    if (soundEnabled) {
      playWebAudioBeep(type);
    }
  }, [soundEnabled]);

  const triggerNotification = useCallback((notif: InAppNotification) => {
    setCurrentNotification(notif);
    playAudioChime('order');
    // Auto dismiss after 6 seconds
    setTimeout(() => {
      setCurrentNotification((prev) => (prev?.id === notif.id ? null : prev));
    }, 6000);
  }, [playAudioChime]);

  const dismissNotification = () => setCurrentNotification(null);

  // Active Order (latest that is not ready or cancelled)
  const activeOrder = useMemo(() => {
    return orders.find(o => o.status !== 'ready' && o.status !== 'cancelled') || null;
  }, [orders]);

  // Keep selected order in sync
  useEffect(() => {
    if (selectedOrder) {
      const updated = orders.find(o => o.id === selectedOrder.id);
      if (updated) setSelectedOrder(updated);
    }
  }, [orders, selectedOrder?.id]);

  const openModal = (modal: string, payload?: any) => {
    if (modal === 'recipe' && payload) setSelectedRecipe(payload);
    if (modal === 'order_detail' && payload) setSelectedOrder(payload);
    setActiveModal(modal);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const toggleFavorite = (recipeId: string) => {
    setFavorites(prev => {
      const next = prev.includes(recipeId) 
        ? prev.filter(id => id !== recipeId) 
        : [...prev, recipeId];
      broadcastFavorites(next);
      return next;
    });
    playAudioChime('chime');
  };

  const isFavorite = (recipeId: string) => favorites.includes(recipeId);

  // Cart operations
  const addToCart = (recipe: Recipe) => {
    setCart(prev => {
      if (prev.some(r => r.id === recipe.id)) return prev;
      return [...prev, recipe];
    });
    playAudioChime('chime');
  };

  const removeFromCart = (recipeId: string) => {
    setCart(prev => prev.filter(r => r.id !== recipeId));
  };

  const clearCart = () => setCart([]);

  // Submit Order
  const submitOrder = (serveMode: ServeMode, serveAt: string, comment?: string) => {
    if (cart.length === 0) return;
    const targetCookId = partner?.uid || (currentUserId === 'user_alex' ? 'user_anna' : 'user_alex');
    
    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      coupleId: couple?.id || 'couple_main',
      createdBy: currentUserId,
      cookId: targetCookId,
      status: 'sent',
      items: cart.map(r => ({
        recipeId: r.id,
        title: r.title,
        timeMinutes: r.timeMinutes,
        photoUrl: r.photoUrl,
      })),
      serveMode,
      serveAt,
      comment: comment?.trim() || undefined,
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [newOrder, ...orders];
    setOrders(updated);
    clearCart();
    closeModal();
    setSelectedOrder(newOrder);
    openModal('order_detail', newOrder);

    // Push notification to partner
    const dishNames = newOrder.items.map(i => i.title[language] || i.title.ru).join(', ');
    const notif: InAppNotification = {
      id: `notif_${Date.now()}`,
      title: language === 'ru' ? 'Новый заказ от партнера!' : 'New order from your partner!',
      body: `${dishNames} · ${language === 'ru' ? 'подать к' : 'serve at'}: ${serveAt}`,
      type: 'order',
      orderId: newOrder.id,
      timestamp: new Date().toISOString(),
    };

    broadcastOrders(updated, notif, targetCookId);
    triggerNotification({
      ...notif,
      title: language === 'ru' ? 'Заказ отправлен партнеру' : 'Order placed successfully',
      body: `${dishNames} (${serveAt})`,
    });
  };

  // Update order status (by cook or flow)
  const updateOrderStatus = (orderId: string, status: OrderStatus, etaMinutes?: number) => {
    const updated = orders.map(o => {
      if (o.id !== orderId) return o;
      const now = new Date().toISOString();
      const next: Order = {
        ...o,
        status,
        updatedAt: now,
        ...(etaMinutes !== undefined ? { etaMinutes, etaSetAt: now } : {}),
        ...(status === 'ready' ? { readyAt: now } : {}),
      };
      return next;
    });

    setOrders(updated);

    const targetOrder = updated.find(o => o.id === orderId);
    if (!targetOrder) return;

    // Notify customer
    const targetUid = targetOrder.createdBy;
    const statusTitles: Record<OrderStatus, { ru: string; en: string }> = {
      sent: { ru: 'Заказ отправлен', en: 'Order sent' },
      accepted: { ru: 'Заказ принят поваром! 👨‍🍳', en: 'Order accepted by chef! 👨‍🍳' },
      cooking: { ru: 'Блюдо уже готовится! 🔥', en: 'Food is cooking now! 🔥' },
      ready: { ru: 'Ура, блюдо готово! Прошу к столу 🍽️🎉', en: 'Hooray, meal is ready! Bon appétit 🍽️🎉' },
      cancelled: { ru: 'Заказ отменен', en: 'Order cancelled' },
    };

    const notif: InAppNotification = {
      id: `notif_${Date.now()}`,
      title: statusTitles[status][language],
      body: targetOrder.items.map(i => i.title[language] || i.title.ru).join(', '),
      type: status === 'ready' ? 'ready' : 'cooking',
      orderId,
      timestamp: new Date().toISOString(),
    };

    broadcastOrders(updated, notif, targetUid);
    triggerNotification(notif);
    playAudioChime(status === 'ready' ? 'timer' : 'chime');
  };

  const setOrderEta = (orderId: string, etaMinutes: number) => {
    const updated = orders.map(o => {
      if (o.id !== orderId) return o;
      const now = new Date().toISOString();
      return {
        ...o,
        status: o.status === 'sent' ? 'cooking' as OrderStatus : o.status,
        etaMinutes,
        etaSetAt: now,
        updatedAt: now,
      };
    });
    setOrders(updated);
    const targetOrder = updated.find(o => o.id === orderId);
    if (!targetOrder) return;

    const notif: InAppNotification = {
      id: `notif_${Date.now()}`,
      title: language === 'ru' ? `Будет готово через ${etaMinutes} минут! ⏱️` : `Ready in ${etaMinutes} minutes! ⏱️`,
      body: targetOrder.items.map(i => i.title[language] || i.title.ru).join(', '),
      type: 'cooking',
      orderId,
      timestamp: new Date().toISOString(),
    };

    broadcastOrders(updated, notif, targetOrder.createdBy);
    triggerNotification(notif);
  };

  const sendOrderMessage = (orderId: string, text: string) => {
    const updated = orders.map(o => {
      if (o.id !== orderId) return o;
      return {
        ...o,
        messages: [
          ...o.messages,
          {
            id: `msg_${Date.now()}`,
            fromUid: currentUserId,
            text,
            createdAt: new Date().toISOString(),
          }
        ],
        updatedAt: new Date().toISOString(),
      };
    });
    setOrders(updated);
    const targetOrder = updated.find(o => o.id === orderId);
    if (!targetOrder) return;

    const recipientUid = currentUserId === targetOrder.createdBy ? targetOrder.cookId : targetOrder.createdBy;
    const notif: InAppNotification = {
      id: `notif_${Date.now()}`,
      title: `${currentUser.displayName}:`,
      body: text,
      type: 'order',
      orderId,
      timestamp: new Date().toISOString(),
    };

    broadcastOrders(updated, notif, recipientUid);
    triggerNotification(notif);
  };

  const sendCounterOffer = (orderId: string, items: OrderItem[], reason?: string) => {
    const updated = orders.map(o => {
      if (o.id !== orderId) return o;
      return {
        ...o,
        counterOffer: {
          items,
          status: 'pending' as const,
          reason,
          proposedAt: new Date().toISOString(),
        },
        updatedAt: new Date().toISOString(),
      };
    });
    setOrders(updated);
    const targetOrder = updated.find(o => o.id === orderId);
    if (!targetOrder) return;

    const notif: InAppNotification = {
      id: `notif_${Date.now()}`,
      title: language === 'ru' ? 'Повар предложил замену блюда!' : 'Chef proposed alternative dishes!',
      body: items.map(i => i.title[language] || i.title.ru).join(', '),
      type: 'counter',
      orderId,
      timestamp: new Date().toISOString(),
    };

    broadcastOrders(updated, notif, targetOrder.createdBy);
    triggerNotification(notif);
  };

  const respondToCounterOffer = (orderId: string, accepted: boolean) => {
    const updated = orders.map(o => {
      if (o.id !== orderId || !o.counterOffer) return o;
      return {
        ...o,
        items: accepted ? o.counterOffer.items : o.items,
        counterOffer: {
          ...o.counterOffer,
          status: accepted ? 'accepted' as const : 'declined' as const,
        },
        status: accepted ? 'accepted' as const : o.status,
        updatedAt: new Date().toISOString(),
      };
    });
    setOrders(updated);
    const targetOrder = updated.find(o => o.id === orderId);
    if (!targetOrder) return;

    const notif: InAppNotification = {
      id: `notif_${Date.now()}`,
      title: accepted 
        ? (language === 'ru' ? 'Замена принята заказчиком! 👍' : 'Alternative accepted! 👍')
        : (language === 'ru' ? 'Замена отклонена заказчиком' : 'Alternative declined'),
      body: targetOrder.items.map(i => i.title[language] || i.title.ru).join(', '),
      type: 'counter',
      orderId,
      timestamp: new Date().toISOString(),
    };

    broadcastOrders(updated, notif, targetOrder.cookId);
    triggerNotification(notif);
  };

  const repeatOrder = (order: Order) => {
    const recipesToCart = order.items.map(item => {
      const found = recipes.find(r => r.id === item.recipeId);
      if (found) return found;
      return {
        id: item.recipeId,
        title: item.title,
        category: 'dinner' as Category,
        photoUrl: item.photoUrl,
        timeMinutes: item.timeMinutes,
        ingredients: [],
        steps: [],
      };
    });
    setCart(recipesToCart);
    openModal('checkout');
  };

  // Pair Linking
  const pairWithCode = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    const targetUser = Object.values(DEMO_USERS).find(u => u.pairCode === clean && u.uid !== currentUserId);
    if (!targetUser) return false;

    const newCouple: Couple = {
      id: `couple_${Date.now()}`,
      memberIds: [currentUserId, targetUser.uid],
      createdAt: new Date().toISOString(),
    };

    setCouple(newCouple);
    localStorage.setItem(STORAGE_KEY_COUPLE, JSON.stringify(newCouple));
    closeModal();

    triggerNotification({
      id: `notif_${Date.now()}`,
      title: language === 'ru' ? 'Пара успешно привязана!' : 'Pair successfully connected!',
      body: `${currentUser.displayName} ❤️ ${targetUser.displayName}`,
      type: 'pair',
      timestamp: new Date().toISOString(),
    });
    return true;
  };

  const unlinkCouple = () => {
    setCouple(null);
    localStorage.removeItem(STORAGE_KEY_COUPLE);
    triggerNotification({
      id: `notif_${Date.now()}`,
      title: language === 'ru' ? 'Пара отвязана' : 'Couple unlinked',
      body: language === 'ru' ? 'Вы больше не связаны с партнером' : 'You are no longer linked',
      type: 'pair',
      timestamp: new Date().toISOString(),
    });
  };

  const switchUser = (uid: string) => {
    setCurrentUserId(uid);
    localStorage.setItem(STORAGE_KEY_CURRENT_USER, uid);
    playAudioChime('chime');
  };

  const addCustomRecipe = (recipe: Recipe) => {
    setRecipes(prev => [recipe, ...prev]);
    triggerNotification({
      id: `notif_${Date.now()}`,
      title: language === 'ru' ? 'Рецепт добавлен!' : 'Recipe added!',
      body: recipe.title[language] || recipe.title.ru,
      type: 'order',
      timestamp: new Date().toISOString(),
    });
  };

  const broadcastShoppingList = useCallback((list: ShoppingListItem[], src?: string) => {
    localStorage.setItem(STORAGE_KEY_SHOPPING, JSON.stringify(list));
    if (src) localStorage.setItem(STORAGE_KEY_SHOPPING_SOURCE, src);
    try {
      const channel = new BroadcastChannel('homeorder_sync_v1');
      channel.postMessage({
        type: 'SYNC_SHOPPING',
        payload: { shoppingList: list, source: src },
      });
      channel.close();
    } catch {}
  }, []);

  const generateShoppingListFromOrder = useCallback((targetOrder: Order) => {
    const items: ShoppingListItem[] = [];
    targetOrder.items.forEach(orderItem => {
      const recipe = recipes.find(r => r.id === orderItem.recipeId);
      if (!recipe) return;
      const dishTitle = recipe.title[language] || recipe.title.ru;
      recipe.ingredients.forEach((ing, idx) => {
        items.push({
          id: `shop_${targetOrder.id}_${recipe.id}_${idx}`,
          name: ing.name[language] || ing.name.ru,
          amount: ing.amount,
          unit: ing.unit[language] || ing.unit.ru,
          dishTitle,
          recipeId: recipe.id,
          checked: false,
        });
      });
    });

    const src = targetOrder.items.map(i => i.title[language] || i.title.ru).join(', ');
    setShoppingList(items);
    setShoppingListSource(src);
    broadcastShoppingList(items, src);
    openModal('shopping_list');
    playAudioChime('chime');
  }, [recipes, language, broadcastShoppingList, playAudioChime, openModal]);

  const generateShoppingListFromCart = useCallback(() => {
    if (cart.length === 0) return;
    const items: ShoppingListItem[] = [];
    cart.forEach(recipe => {
      const dishTitle = recipe.title[language] || recipe.title.ru;
      recipe.ingredients.forEach((ing, idx) => {
        items.push({
          id: `shop_cart_${recipe.id}_${idx}`,
          name: ing.name[language] || ing.name.ru,
          amount: ing.amount,
          unit: ing.unit[language] || ing.unit.ru,
          dishTitle,
          recipeId: recipe.id,
          checked: false,
        });
      });
    });

    const src = cart.map(i => i.title[language] || i.title.ru).join(', ');
    setShoppingList(items);
    setShoppingListSource(src);
    broadcastShoppingList(items, src);
    openModal('shopping_list');
    playAudioChime('chime');
  }, [cart, language, broadcastShoppingList, playAudioChime, openModal]);

  const generateShoppingListFromRecipe = useCallback((recipe: Recipe) => {
    const dishTitle = recipe.title[language] || recipe.title.ru;
    const items: ShoppingListItem[] = recipe.ingredients.map((ing, idx) => ({
      id: `shop_rec_${recipe.id}_${idx}_${Date.now()}`,
      name: ing.name[language] || ing.name.ru,
      amount: ing.amount,
      unit: ing.unit[language] || ing.unit.ru,
      dishTitle,
      recipeId: recipe.id,
      checked: false,
    }));

    setShoppingList(items);
    setShoppingListSource(dishTitle);
    broadcastShoppingList(items, dishTitle);
    openModal('shopping_list');
    playAudioChime('chime');
  }, [language, broadcastShoppingList, playAudioChime, openModal]);

  const toggleShoppingItem = useCallback((itemId: string) => {
    setShoppingList(prev => {
      const next = prev.map(item => item.id === itemId ? { ...item, checked: !item.checked } : item);
      broadcastShoppingList(next, shoppingListSource);
      return next;
    });
    playAudioChime('chime');
  }, [broadcastShoppingList, shoppingListSource, playAudioChime]);

  const addShoppingItem = useCallback((name: string, amount: string = '1', unit: string = 'шт', dishTitle?: string) => {
    if (!name.trim()) return;
    const newItem: ShoppingListItem = {
      id: `shop_custom_${Date.now()}`,
      name: name.trim(),
      amount: amount.trim() || '1',
      unit: unit.trim() || 'шт',
      dishTitle: dishTitle || (language === 'ru' ? 'Дополнительно' : 'Extra'),
      checked: false,
      addedManually: true,
    };
    setShoppingList(prev => {
      const next = [newItem, ...prev];
      broadcastShoppingList(next, shoppingListSource);
      return next;
    });
    playAudioChime('chime');
  }, [broadcastShoppingList, shoppingListSource, language, playAudioChime]);

  const removeShoppingItem = useCallback((itemId: string) => {
    setShoppingList(prev => {
      const next = prev.filter(i => i.id !== itemId);
      broadcastShoppingList(next, shoppingListSource);
      return next;
    });
  }, [broadcastShoppingList, shoppingListSource]);

  const clearCheckedShoppingItems = useCallback(() => {
    setShoppingList(prev => {
      const next = prev.filter(i => !i.checked);
      broadcastShoppingList(next, shoppingListSource);
      return next;
    });
    playAudioChime('chime');
  }, [broadcastShoppingList, shoppingListSource, playAudioChime]);

  const resetAllShoppingItems = useCallback(() => {
    setShoppingList(prev => {
      const next = prev.map(i => ({ ...i, checked: false }));
      broadcastShoppingList(next, shoppingListSource);
      return next;
    });
    playAudioChime('chime');
  }, [broadcastShoppingList, shoppingListSource, playAudioChime]);

  const setOnboardingSeenHandler = (seen: boolean) => {
    setOnboardingSeen(seen);
    localStorage.setItem(STORAGE_KEY_ONBOARDING, seen ? 'true' : 'false');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentUser,
        partner,
        couple,
        switchUser,
        unlinkCouple,
        pairWithCode,
        activeTab,
        setActiveTab,
        activeModal,
        openModal,
        closeModal,
        recipes,
        favorites,
        toggleFavorite,
        isFavorite,
        selectedRecipe,
        setSelectedRecipe,
        addCustomRecipe,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        submitOrder,
        orders,
        activeOrder,
        selectedOrder,
        setSelectedOrder,
        updateOrderStatus,
        setOrderEta,
        sendOrderMessage,
        sendCounterOffer,
        respondToCounterOffer,
        repeatOrder,
        shoppingList,
        shoppingListSource,
        generateShoppingListFromOrder,
        generateShoppingListFromCart,
        generateShoppingListFromRecipe,
        toggleShoppingItem,
        addShoppingItem,
        removeShoppingItem,
        clearCheckedShoppingItems,
        resetAllShoppingItems,
        viewMode,
        setViewMode,
        soundEnabled,
        setSoundEnabled,
        currentNotification,
        dismissNotification,
        playAudioChime,
        onboardingSeen,
        setOnboardingSeen: setOnboardingSeenHandler,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
