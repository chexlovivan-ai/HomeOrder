export type Language = 'ru' | 'en';

export type Category = 
  | 'breakfast' 
  | 'lunch' 
  | 'dinner' 
  | 'salad' 
  | 'soup' 
  | 'dessert';

export interface LocalizedString {
  ru: string;
  en: string;
}

export interface Ingredient {
  name: LocalizedString;
  amount: string;
  unit: LocalizedString;
}

export interface RecipeStep {
  text: LocalizedString;
  timerSeconds?: number;
}

export interface Recipe {
  id: string;
  title: LocalizedString;
  description?: LocalizedString;
  category: Category;
  photoUrl: string;
  timeMinutes: number;
  servings?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  ingredients: Ingredient[];
  steps: RecipeStep[];
  isCustom?: boolean;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  avatar: string;
  pairCode: string;
  coupleId: string | null;
  partnerUid?: string | null;
}

export interface Couple {
  id: string;
  memberIds: [string, string];
  createdAt: string;
}

export interface OrderItem {
  recipeId: string;
  title: LocalizedString;
  timeMinutes: number;
  photoUrl: string;
}

export type ServeMode = 'asap' | 'in30' | 'in60' | 'at';

export type OrderStatus = 'sent' | 'accepted' | 'cooking' | 'ready' | 'cancelled';

export interface CounterOffer {
  items: OrderItem[];
  status: 'pending' | 'accepted' | 'declined';
  reason?: string;
  proposedAt: string;
}

export interface OrderMessage {
  id: string;
  fromUid: string;
  text: string;
  createdAt: string;
}

export interface Order {
  id: string;
  coupleId: string;
  createdBy: string; // Заказчик
  cookId: string;    // Повар
  status: OrderStatus;
  items: OrderItem[];
  serveMode: ServeMode;
  serveAt: string; // ISO string or human-readable target time
  comment?: string;
  etaMinutes?: number | null;
  etaSetAt?: string | null;
  counterOffer?: CounterOffer | null;
  messages: OrderMessage[];
  createdAt: string;
  updatedAt: string;
  readyAt?: string | null;
}

export interface PairRequest {
  id: string;
  fromUid: string;
  fromName: string;
  toUid: string;
  toCode: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
}

export interface InAppNotification {
  id: string;
  title: string;
  body: string;
  type: 'order' | 'pair' | 'cooking' | 'ready' | 'counter';
  orderId?: string;
  timestamp: string;
}

export interface ShoppingListItem {
  id: string;
  name: string;
  amount: string;
  unit: string;
  dishTitle?: string;
  recipeId?: string;
  checked: boolean;
  category?: string;
  addedManually?: boolean;
}
