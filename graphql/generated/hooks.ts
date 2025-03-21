import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { axiosGraphQL } from '@/utils/axios.fetcher';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  Email: { input: any; output: any; }
};

export type BaseOrder = {
  _id?: Maybe<Scalars['ID']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  fullAddress?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  orderPrice?: Maybe<Scalars['Float']['output']>;
  paymentDetails?: Maybe<PaymentDetails>;
  paymentOption?: Maybe<OrderPaymentOption>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  postcode?: Maybe<Scalars['String']['output']>;
  shippingRegion?: Maybe<ShippingRegion>;
  state?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ChangePasswordInput = {
  confirmPassword: Scalars['String']['input'];
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};

export type City = {
  __typename?: 'City';
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type CreateOrderInput = {
  city: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  fullAddress: Scalars['String']['input'];
  name: Scalars['String']['input'];
  orderPrice: Scalars['Float']['input'];
  packageId: Scalars['String']['input'];
  paymentOption: OrderPaymentOption;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  postcode: Scalars['String']['input'];
  productId: Scalars['ID']['input'];
  shippingRegion?: InputMaybe<ShippingRegion>;
  state: Scalars['String']['input'];
};

export type CreateProductInput = {
  allowShipment: Scalars['Boolean']['input'];
  facebookPixel?: InputMaybe<FacebookPixelInput>;
  faqs?: InputMaybe<Array<FaqInput>>;
  feedback?: InputMaybe<Array<FeedbackInput>>;
  images: Array<Scalars['String']['input']>;
  name: MultilingualStringInput;
  packages?: InputMaybe<Array<PackageInput>>;
  price: Scalars['Float']['input'];
  salePrice?: InputMaybe<Scalars['Float']['input']>;
  satisfiedCustomers?: InputMaybe<Scalars['Int']['input']>;
  sectionColors?: InputMaybe<SectionColorsInput>;
  sections?: InputMaybe<Array<SectionInput>>;
  slug: Scalars['String']['input'];
  unitsSold?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateUserInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Customer = {
  __typename?: 'Customer';
  image?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type CustomerInput = {
  image: Scalars['String']['input'];
  location: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type DeleteProductByIdInput = {
  id: Scalars['ID']['input'];
};

export type DeleteProductBySlugInput = {
  slug: Scalars['String']['input'];
};

export type Faq = {
  __typename?: 'FAQ';
  answer?: Maybe<MultilingualString>;
  question?: Maybe<MultilingualString>;
};

export type FaqInput = {
  answer: MultilingualStringInput;
  question: MultilingualStringInput;
};

export type FacebookPixel = {
  __typename?: 'FacebookPixel';
  enabled?: Maybe<Scalars['Boolean']['output']>;
  settings?: Maybe<FacebookPixelSettings>;
};

export enum FacebookPixelEvents {
  Order = 'ORDER',
  Purchase = 'PURCHASE'
}

export type FacebookPixelInput = {
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  settings?: InputMaybe<FacebookPixelSettingsInput>;
};

export type FacebookPixelSettings = {
  __typename?: 'FacebookPixelSettings';
  accessToken?: Maybe<Scalars['String']['output']>;
  codeTestEvent?: Maybe<Scalars['String']['output']>;
  events?: Maybe<Array<Scalars['String']['output']>>;
  pixelId?: Maybe<Scalars['String']['output']>;
};

export type FacebookPixelSettingsInput = {
  accessToken: Scalars['String']['input'];
  codeTestEvent?: InputMaybe<Scalars['String']['input']>;
  events: Array<FacebookPixelEvents>;
  pixelId: Scalars['String']['input'];
};

export type Feedback = {
  __typename?: 'Feedback';
  comment?: Maybe<Scalars['String']['output']>;
  customer?: Maybe<Customer>;
  isGoogleReview?: Maybe<Scalars['Boolean']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
};

export type FeedbackInput = {
  comment: Scalars['String']['input'];
  customer: CustomerInput;
  isGoogleReview: Scalars['Boolean']['input'];
  rating: Scalars['Float']['input'];
};

export type LoginInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Message = {
  __typename?: 'Message';
  message?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type MultilingualString = {
  __typename?: 'MultilingualString';
  en?: Maybe<Scalars['String']['output']>;
  ms?: Maybe<Scalars['String']['output']>;
};

export type MultilingualStringInput = {
  en: Scalars['String']['input'];
  ms: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  UpdateStatusToPaid?: Maybe<Message>;
  addCollectionIdToAllProducts?: Maybe<Message>;
  addIdToAllPackages?: Maybe<Message>;
  changePassword?: Maybe<Message>;
  createOrder?: Maybe<Order>;
  createProduct?: Maybe<Product>;
  createUser?: Maybe<User>;
  deleteAllProducts?: Maybe<Scalars['Int']['output']>;
  deleteOrder?: Maybe<Order>;
  deleteProductById?: Maybe<Product>;
  deleteProductBySlug?: Maybe<Product>;
  login?: Maybe<Scalars['String']['output']>;
  togglePublish?: Maybe<Message>;
  updateAdminInfo?: Maybe<User>;
  updateProductById?: Maybe<Product>;
};


export type MutationUpdateStatusToPaidArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAddCollectionIdToAllProductsArgs = {
  batchSize: Scalars['Int']['input'];
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationCreateOrderArgs = {
  input: CreateOrderInput;
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteOrderArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteProductByIdArgs = {
  input: DeleteProductByIdInput;
};


export type MutationDeleteProductBySlugArgs = {
  input: DeleteProductBySlugInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationTogglePublishArgs = {
  input: Scalars['ID']['input'];
};


export type MutationUpdateAdminInfoArgs = {
  input: UpdateAdminInfoInput;
};


export type MutationUpdateProductByIdArgs = {
  input: UpdateProductByIdInput;
};

export type Order = BaseOrder & {
  __typename?: 'Order';
  _id?: Maybe<Scalars['ID']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  fullAddress?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  orderPrice?: Maybe<Scalars['Float']['output']>;
  packageId?: Maybe<Scalars['ID']['output']>;
  paymentDetails?: Maybe<PaymentDetails>;
  paymentOption?: Maybe<OrderPaymentOption>;
  paymentUrl?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  postcode?: Maybe<Scalars['String']['output']>;
  productId?: Maybe<Scalars['ID']['output']>;
  shippingRegion?: Maybe<ShippingRegion>;
  state?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export enum OrderPaymentOption {
  Cod = 'COD',
  Online = 'ONLINE'
}

export enum OrderPaymentStatus {
  Failed = 'FAILED',
  Paid = 'PAID',
  Pending = 'PENDING'
}

export type Package = {
  __typename?: 'Package';
  _id?: Maybe<Scalars['ID']['output']>;
  description?: Maybe<MultilingualString>;
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<MultilingualString>;
  price?: Maybe<Scalars['Float']['output']>;
};

export type PackageInput = {
  description: MultilingualStringInput;
  image: Scalars['String']['input'];
  name: MultilingualStringInput;
  price: Scalars['Float']['input'];
};

export type PaginatedOrderResponse = {
  __typename?: 'PaginatedOrderResponse';
  paginatorInfo?: Maybe<PaginatedResponse>;
  results?: Maybe<Array<PopulatedOrderWithPackage>>;
};

export type PaginatedResponse = {
  __typename?: 'PaginatedResponse';
  currentPage?: Maybe<Scalars['Int']['output']>;
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  pageSize?: Maybe<Scalars['Int']['output']>;
  pages?: Maybe<Scalars['Int']['output']>;
  totalRecords?: Maybe<Scalars['Int']['output']>;
};

export type PaymentDetails = {
  __typename?: 'PaymentDetails';
  billId?: Maybe<Scalars['String']['output']>;
  billUrl?: Maybe<Scalars['String']['output']>;
  status?: Maybe<OrderPaymentStatus>;
};

export type PopulatedOrder = BaseOrder & {
  __typename?: 'PopulatedOrder';
  _id?: Maybe<Scalars['ID']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  fullAddress?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  orderPrice?: Maybe<Scalars['Float']['output']>;
  packageId?: Maybe<Scalars['ID']['output']>;
  paymentDetails?: Maybe<PaymentDetails>;
  paymentOption?: Maybe<OrderPaymentOption>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  postcode?: Maybe<Scalars['String']['output']>;
  productId?: Maybe<Product>;
  shippingRegion?: Maybe<ShippingRegion>;
  state?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PopulatedOrderWithPackage = BaseOrder & {
  __typename?: 'PopulatedOrderWithPackage';
  _id?: Maybe<Scalars['ID']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  fullAddress?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  orderPrice?: Maybe<Scalars['Float']['output']>;
  packageId?: Maybe<Package>;
  paymentDetails?: Maybe<PaymentDetails>;
  paymentOption?: Maybe<OrderPaymentOption>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  postcode?: Maybe<Scalars['String']['output']>;
  productId?: Maybe<Product>;
  shippingRegion?: Maybe<ShippingRegion>;
  state?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Product = {
  __typename?: 'Product';
  _id?: Maybe<Scalars['ID']['output']>;
  allowShipment?: Maybe<Scalars['Boolean']['output']>;
  collectionId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  facebookPixel?: Maybe<FacebookPixel>;
  faqs?: Maybe<Array<Faq>>;
  feedback?: Maybe<Array<Feedback>>;
  images?: Maybe<Array<Scalars['String']['output']>>;
  name?: Maybe<MultilingualString>;
  packages?: Maybe<Array<Package>>;
  price?: Maybe<Scalars['Float']['output']>;
  published?: Maybe<Scalars['Boolean']['output']>;
  salePrice?: Maybe<Scalars['Float']['output']>;
  satisfiedCustomers?: Maybe<Scalars['Int']['output']>;
  sectionColors?: Maybe<SectionColors>;
  sections?: Maybe<Array<Section>>;
  slug?: Maybe<Scalars['String']['output']>;
  unitsSold?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ProductPageInfo = {
  __typename?: 'ProductPageInfo';
  _id?: Maybe<Scalars['ID']['output']>;
  avgRating?: Maybe<Scalars['Float']['output']>;
  images?: Maybe<Array<Scalars['String']['output']>>;
  name?: Maybe<MultilingualString>;
  price?: Maybe<Scalars['Float']['output']>;
  salePrice?: Maybe<Scalars['Float']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  allStates?: Maybe<Array<State>>;
  currentUser?: Maybe<User>;
  exportProductsData?: Maybe<Message>;
  getCitiesByState?: Maybe<Array<City>>;
  importProductsData?: Maybe<Message>;
  orderById?: Maybe<PopulatedOrder>;
  orders?: Maybe<Array<PopulatedOrder>>;
  paginatedOrders?: Maybe<PaginatedOrderResponse>;
  product?: Maybe<Product>;
  productBySlug?: Maybe<Product>;
  products?: Maybe<Array<Product>>;
  productsForPage?: Maybe<Array<ProductPageInfo>>;
};


export type QueryGetCitiesByStateArgs = {
  stateName: Scalars['String']['input'];
};


export type QueryOrderByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPaginatedOrdersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductArgs = {
  productId: Scalars['ID']['input'];
};


export type QueryProductBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryProductsForPageArgs = {
  published?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Section = {
  __typename?: 'Section';
  description?: Maybe<MultilingualString>;
  heading?: Maybe<MultilingualString>;
  images?: Maybe<Array<Scalars['String']['output']>>;
  orderIndex?: Maybe<Scalars['Int']['output']>;
  sectionColor?: Maybe<Scalars['String']['output']>;
  subheading?: Maybe<MultilingualString>;
  type?: Maybe<Scalars['String']['output']>;
};

export type SectionColors = {
  __typename?: 'SectionColors';
  faqSection?: Maybe<Scalars['String']['output']>;
  feedbackSection?: Maybe<Scalars['String']['output']>;
  freeGiftSection?: Maybe<Scalars['String']['output']>;
  packageSection?: Maybe<Scalars['String']['output']>;
  paymentSection?: Maybe<Scalars['String']['output']>;
  productSection?: Maybe<Scalars['String']['output']>;
};

export type SectionColorsInput = {
  faqSection?: InputMaybe<Scalars['String']['input']>;
  feedbackSection?: InputMaybe<Scalars['String']['input']>;
  freeGiftSection?: InputMaybe<Scalars['String']['input']>;
  packageSection?: InputMaybe<Scalars['String']['input']>;
  paymentSection?: InputMaybe<Scalars['String']['input']>;
  productSection?: InputMaybe<Scalars['String']['input']>;
};

export type SectionInput = {
  description: MultilingualStringInput;
  heading: MultilingualStringInput;
  images: Array<Scalars['String']['input']>;
  orderIndex: Scalars['Int']['input'];
  sectionColor: Scalars['String']['input'];
  subheading: MultilingualStringInput;
  type: SectionType;
};

export enum SectionType {
  Normal = 'NORMAL',
  Warning = 'WARNING'
}

export enum ShippingRegion {
  East = 'EAST',
  West = 'WEST'
}

export enum ShippingStatus {
  Delivered = 'DELIVERED',
  Failed = 'FAILED',
  InTransit = 'IN_TRANSIT',
  OutForDelivery = 'OUT_FOR_DELIVERY',
  Pending = 'PENDING',
  PendingPickup = 'PENDING_PICKUP',
  PickedUp = 'PICKED_UP',
  Returned = 'RETURNED'
}

export type State = {
  __typename?: 'State';
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type UpdateAdminInfoInput = {
  address: Scalars['String']['input'];
  city: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  postcode: Scalars['String']['input'];
  state: Scalars['String']['input'];
};

export type UpdateProductByIdInput = {
  data: UpdateProductInput;
  id: Scalars['ID']['input'];
};

export type UpdateProductInput = {
  allowShipment: Scalars['Boolean']['input'];
  facebookPixel?: InputMaybe<FacebookPixelInput>;
  faqs?: InputMaybe<Array<FaqInput>>;
  feedback?: InputMaybe<Array<FeedbackInput>>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<MultilingualStringInput>;
  packages?: InputMaybe<Array<PackageInput>>;
  price?: InputMaybe<Scalars['Float']['input']>;
  salePrice?: InputMaybe<Scalars['Float']['input']>;
  satisfiedCustomers?: InputMaybe<Scalars['Int']['input']>;
  sectionColors?: InputMaybe<SectionColorsInput>;
  sections?: InputMaybe<Array<SectionInput>>;
  unitsSold?: InputMaybe<Scalars['Int']['input']>;
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isAdmin?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  postcode?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UpdateProductByIdMutationVariables = Exact<{
  input: UpdateProductByIdInput;
}>;


export type UpdateProductByIdMutation = { __typename?: 'Mutation', updateProductById?: { __typename?: 'Product', _id?: string | null } | null };

export type CreateProductMutationVariables = Exact<{
  input: CreateProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct?: { __typename?: 'Product', _id?: string | null } | null };

export type DeleteAllProductsMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteAllProductsMutation = { __typename?: 'Mutation', deleteAllProducts?: number | null };

export type DeleteProductByIdMutationVariables = Exact<{
  input: DeleteProductByIdInput;
}>;


export type DeleteProductByIdMutation = { __typename?: 'Mutation', deleteProductById?: { __typename?: 'Product', _id?: string | null } | null };

export type DeleteProductBySlugMutationVariables = Exact<{
  input: DeleteProductBySlugInput;
}>;


export type DeleteProductBySlugMutation = { __typename?: 'Mutation', deleteProductBySlug?: { __typename?: 'Product', _id?: string | null } | null };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: string | null };

export type TogglePublishMutationVariables = Exact<{
  input: Scalars['ID']['input'];
}>;


export type TogglePublishMutation = { __typename?: 'Mutation', togglePublish?: { __typename?: 'Message', message?: string | null, status?: number | null } | null };

export type CreateOrderMutationVariables = Exact<{
  input: CreateOrderInput;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder?: { __typename?: 'Order', _id?: string | null, paymentUrl?: string | null, orderPrice?: number | null, packageId?: string | null, paymentOption?: OrderPaymentOption | null } | null };

export type DeleteOrderMutationVariables = Exact<{
  deleteOrderId: Scalars['ID']['input'];
}>;


export type DeleteOrderMutation = { __typename?: 'Mutation', deleteOrder?: { __typename?: 'Order', _id?: string | null } | null };

export type UpdateStatusToPaidMutationVariables = Exact<{
  updateStatusToPaidId: Scalars['ID']['input'];
}>;


export type UpdateStatusToPaidMutation = { __typename?: 'Mutation', UpdateStatusToPaid?: { __typename?: 'Message', message?: string | null, status?: number | null } | null };

export type ChangePasswordMutationVariables = Exact<{
  input: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword?: { __typename?: 'Message', status?: number | null, message?: string | null } | null };

export type UpdateAdminInfoMutationVariables = Exact<{
  input: UpdateAdminInfoInput;
}>;


export type UpdateAdminInfoMutation = { __typename?: 'Mutation', updateAdminInfo?: { __typename?: 'User', id?: string | null, email?: string | null, city?: string | null, address?: string | null, name?: string | null, phoneNumber?: string | null, postcode?: string | null, state?: string | null } | null };

export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQuery = { __typename?: 'Query', products?: Array<{ __typename?: 'Product', _id?: string | null, createdAt?: any | null, published?: boolean | null, allowShipment?: boolean | null, satisfiedCustomers?: number | null, slug?: string | null, images?: Array<string> | null, price?: number | null, salePrice?: number | null, unitsSold?: number | null, updatedAt?: any | null, faqs?: Array<{ __typename?: 'FAQ', answer?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null, question?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null }> | null, sectionColors?: { __typename?: 'SectionColors', faqSection?: string | null, feedbackSection?: string | null, freeGiftSection?: string | null, packageSection?: string | null, paymentSection?: string | null, productSection?: string | null } | null, feedback?: Array<{ __typename?: 'Feedback', comment?: string | null, rating?: number | null, isGoogleReview?: boolean | null, customer?: { __typename?: 'Customer', name?: string | null, image?: string | null, location?: string | null } | null }> | null, packages?: Array<{ __typename?: 'Package', _id?: string | null, image?: string | null, price?: number | null, description?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null, name?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null }> | null, name?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null, facebookPixel?: { __typename?: 'FacebookPixel', enabled?: boolean | null, settings?: { __typename?: 'FacebookPixelSettings', accessToken?: string | null, codeTestEvent?: string | null, events?: Array<string> | null, pixelId?: string | null } | null } | null, sections?: Array<{ __typename?: 'Section', sectionColor?: string | null, images?: Array<string> | null, orderIndex?: number | null, type?: string | null, description?: { __typename?: 'MultilingualString', ms?: string | null, en?: string | null } | null, heading?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null, subheading?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null }> | null }> | null };

export type ProductsForPageQueryVariables = Exact<{
  published?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type ProductsForPageQuery = { __typename?: 'Query', productsForPage?: Array<{ __typename?: 'ProductPageInfo', _id?: string | null, slug?: string | null, avgRating?: number | null, images?: Array<string> | null, price?: number | null, salePrice?: number | null, name?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null }> | null };

export type ProductBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type ProductBySlugQuery = { __typename?: 'Query', productBySlug?: { __typename?: 'Product', _id?: string | null, createdAt?: any | null, satisfiedCustomers?: number | null, published?: boolean | null, allowShipment?: boolean | null, images?: Array<string> | null, price?: number | null, salePrice?: number | null, unitsSold?: number | null, updatedAt?: any | null, faqs?: Array<{ __typename?: 'FAQ', answer?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null, question?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null }> | null, sectionColors?: { __typename?: 'SectionColors', faqSection?: string | null, feedbackSection?: string | null, freeGiftSection?: string | null, packageSection?: string | null, paymentSection?: string | null, productSection?: string | null } | null, facebookPixel?: { __typename?: 'FacebookPixel', enabled?: boolean | null, settings?: { __typename?: 'FacebookPixelSettings', accessToken?: string | null, codeTestEvent?: string | null, events?: Array<string> | null, pixelId?: string | null } | null } | null, feedback?: Array<{ __typename?: 'Feedback', comment?: string | null, rating?: number | null, isGoogleReview?: boolean | null, customer?: { __typename?: 'Customer', name?: string | null, image?: string | null, location?: string | null } | null }> | null, packages?: Array<{ __typename?: 'Package', _id?: string | null, image?: string | null, price?: number | null, description?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null, name?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null }> | null, name?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null, sections?: Array<{ __typename?: 'Section', sectionColor?: string | null, images?: Array<string> | null, orderIndex?: number | null, type?: string | null, description?: { __typename?: 'MultilingualString', ms?: string | null, en?: string | null } | null, heading?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null, subheading?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null }> | null } | null };

export type ProductByIdQueryVariables = Exact<{
  productId: Scalars['ID']['input'];
}>;


export type ProductByIdQuery = { __typename?: 'Query', product?: { __typename?: 'Product', _id?: string | null, createdAt?: any | null, published?: boolean | null, satisfiedCustomers?: number | null, allowShipment?: boolean | null, images?: Array<string> | null, price?: number | null, salePrice?: number | null, unitsSold?: number | null, updatedAt?: any | null, faqs?: Array<{ __typename?: 'FAQ', answer?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null, question?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null }> | null, sectionColors?: { __typename?: 'SectionColors', faqSection?: string | null, feedbackSection?: string | null, freeGiftSection?: string | null, packageSection?: string | null, paymentSection?: string | null, productSection?: string | null } | null, facebookPixel?: { __typename?: 'FacebookPixel', enabled?: boolean | null, settings?: { __typename?: 'FacebookPixelSettings', accessToken?: string | null, codeTestEvent?: string | null, events?: Array<string> | null, pixelId?: string | null } | null } | null, feedback?: Array<{ __typename?: 'Feedback', comment?: string | null, rating?: number | null, isGoogleReview?: boolean | null, customer?: { __typename?: 'Customer', name?: string | null, image?: string | null, location?: string | null } | null }> | null, packages?: Array<{ __typename?: 'Package', _id?: string | null, image?: string | null, price?: number | null, description?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null, name?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null }> | null, name?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null, sections?: Array<{ __typename?: 'Section', sectionColor?: string | null, images?: Array<string> | null, orderIndex?: number | null, type?: string | null, description?: { __typename?: 'MultilingualString', ms?: string | null, en?: string | null } | null, heading?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null, subheading?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null }> | null } | null };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id?: string | null, isAdmin?: boolean | null, username?: string | null, name?: string | null, phoneNumber?: string | null, address?: string | null, city?: string | null, postcode?: string | null, state?: string | null, email?: string | null } | null };

export type AllStatesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllStatesQuery = { __typename?: 'Query', allStates?: Array<{ __typename?: 'State', id?: number | null, name?: string | null }> | null };

export type GetCitiesByStateQueryVariables = Exact<{
  stateName: Scalars['String']['input'];
}>;


export type GetCitiesByStateQuery = { __typename?: 'Query', getCitiesByState?: Array<{ __typename?: 'City', id?: number | null, name?: string | null }> | null };

export type OrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type OrdersQuery = { __typename?: 'Query', orders?: Array<{ __typename?: 'PopulatedOrder', _id?: string | null, city?: string | null, createdAt?: any | null, fullAddress?: string | null, name?: string | null, email?: string | null, orderPrice?: number | null, packageId?: string | null, paymentOption?: OrderPaymentOption | null, shippingRegion?: ShippingRegion | null, phoneNumber?: string | null, postcode?: string | null, state?: string | null, updatedAt?: any | null, productId?: { __typename?: 'Product', _id?: string | null, name?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null } | null, paymentDetails?: { __typename?: 'PaymentDetails', billId?: string | null, billUrl?: string | null, status?: OrderPaymentStatus | null } | null }> | null };

export type OrderByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OrderByIdQuery = { __typename?: 'Query', orderById?: { __typename?: 'PopulatedOrder', _id?: string | null, city?: string | null, createdAt?: any | null, fullAddress?: string | null, name?: string | null, email?: string | null, orderPrice?: number | null, packageId?: string | null, paymentOption?: OrderPaymentOption | null, phoneNumber?: string | null, postcode?: string | null, state?: string | null, updatedAt?: any | null, paymentDetails?: { __typename?: 'PaymentDetails', billId?: string | null, billUrl?: string | null, status?: OrderPaymentStatus | null } | null, productId?: { __typename?: 'Product', _id?: string | null, name?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null, facebookPixel?: { __typename?: 'FacebookPixel', enabled?: boolean | null, settings?: { __typename?: 'FacebookPixelSettings', accessToken?: string | null, codeTestEvent?: string | null, events?: Array<string> | null, pixelId?: string | null } | null } | null } | null } | null };

export type PaginatedOrdersQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type PaginatedOrdersQuery = { __typename?: 'Query', paginatedOrders?: { __typename?: 'PaginatedOrderResponse', results?: Array<{ __typename?: 'PopulatedOrderWithPackage', _id?: string | null, city?: string | null, createdAt?: any | null, fullAddress?: string | null, name?: string | null, email?: string | null, orderPrice?: number | null, paymentOption?: OrderPaymentOption | null, shippingRegion?: ShippingRegion | null, phoneNumber?: string | null, postcode?: string | null, state?: string | null, updatedAt?: any | null, packageId?: { __typename?: 'Package', _id?: string | null, name?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null } | null, paymentDetails?: { __typename?: 'PaymentDetails', billId?: string | null, billUrl?: string | null, status?: OrderPaymentStatus | null } | null, productId?: { __typename?: 'Product', _id?: string | null, name?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null, facebookPixel?: { __typename?: 'FacebookPixel', enabled?: boolean | null, settings?: { __typename?: 'FacebookPixelSettings', accessToken?: string | null, codeTestEvent?: string | null, events?: Array<string> | null, pixelId?: string | null } | null } | null } | null }> | null, paginatorInfo?: { __typename?: 'PaginatedResponse', currentPage?: number | null, hasNextPage?: boolean | null, pageSize?: number | null, pages?: number | null, totalRecords?: number | null } | null } | null };



export const UpdateProductByIdDocument = `
    mutation UpdateProductById($input: UpdateProductByIdInput!) {
  updateProductById(input: $input) {
    _id
  }
}
    `;

export const useUpdateProductByIdMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateProductByIdMutation, TError, UpdateProductByIdMutationVariables, TContext>) => {
    
    return useMutation<UpdateProductByIdMutation, TError, UpdateProductByIdMutationVariables, TContext>(
      {
    mutationKey: ['UpdateProductById'],
    mutationFn: (variables?: UpdateProductByIdMutationVariables) => axiosGraphQL<UpdateProductByIdMutation, UpdateProductByIdMutationVariables>(UpdateProductByIdDocument, variables)(),
    ...options
  }
    )};

export const CreateProductDocument = `
    mutation CreateProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
    _id
  }
}
    `;

export const useCreateProductMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateProductMutation, TError, CreateProductMutationVariables, TContext>) => {
    
    return useMutation<CreateProductMutation, TError, CreateProductMutationVariables, TContext>(
      {
    mutationKey: ['CreateProduct'],
    mutationFn: (variables?: CreateProductMutationVariables) => axiosGraphQL<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, variables)(),
    ...options
  }
    )};

export const DeleteAllProductsDocument = `
    mutation DeleteAllProducts {
  deleteAllProducts
}
    `;

export const useDeleteAllProductsMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteAllProductsMutation, TError, DeleteAllProductsMutationVariables, TContext>) => {
    
    return useMutation<DeleteAllProductsMutation, TError, DeleteAllProductsMutationVariables, TContext>(
      {
    mutationKey: ['DeleteAllProducts'],
    mutationFn: (variables?: DeleteAllProductsMutationVariables) => axiosGraphQL<DeleteAllProductsMutation, DeleteAllProductsMutationVariables>(DeleteAllProductsDocument, variables)(),
    ...options
  }
    )};

export const DeleteProductByIdDocument = `
    mutation DeleteProductById($input: DeleteProductByIdInput!) {
  deleteProductById(input: $input) {
    _id
  }
}
    `;

export const useDeleteProductByIdMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteProductByIdMutation, TError, DeleteProductByIdMutationVariables, TContext>) => {
    
    return useMutation<DeleteProductByIdMutation, TError, DeleteProductByIdMutationVariables, TContext>(
      {
    mutationKey: ['DeleteProductById'],
    mutationFn: (variables?: DeleteProductByIdMutationVariables) => axiosGraphQL<DeleteProductByIdMutation, DeleteProductByIdMutationVariables>(DeleteProductByIdDocument, variables)(),
    ...options
  }
    )};

export const DeleteProductBySlugDocument = `
    mutation DeleteProductBySlug($input: DeleteProductBySlugInput!) {
  deleteProductBySlug(input: $input) {
    _id
  }
}
    `;

export const useDeleteProductBySlugMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteProductBySlugMutation, TError, DeleteProductBySlugMutationVariables, TContext>) => {
    
    return useMutation<DeleteProductBySlugMutation, TError, DeleteProductBySlugMutationVariables, TContext>(
      {
    mutationKey: ['DeleteProductBySlug'],
    mutationFn: (variables?: DeleteProductBySlugMutationVariables) => axiosGraphQL<DeleteProductBySlugMutation, DeleteProductBySlugMutationVariables>(DeleteProductBySlugDocument, variables)(),
    ...options
  }
    )};

export const LoginDocument = `
    mutation Login($input: LoginInput!) {
  login(input: $input)
}
    `;

export const useLoginMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>) => {
    
    return useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
      {
    mutationKey: ['Login'],
    mutationFn: (variables?: LoginMutationVariables) => axiosGraphQL<LoginMutation, LoginMutationVariables>(LoginDocument, variables)(),
    ...options
  }
    )};

export const TogglePublishDocument = `
    mutation TogglePublish($input: ID!) {
  togglePublish(input: $input) {
    message
    status
  }
}
    `;

export const useTogglePublishMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<TogglePublishMutation, TError, TogglePublishMutationVariables, TContext>) => {
    
    return useMutation<TogglePublishMutation, TError, TogglePublishMutationVariables, TContext>(
      {
    mutationKey: ['TogglePublish'],
    mutationFn: (variables?: TogglePublishMutationVariables) => axiosGraphQL<TogglePublishMutation, TogglePublishMutationVariables>(TogglePublishDocument, variables)(),
    ...options
  }
    )};

export const CreateOrderDocument = `
    mutation CreateOrder($input: CreateOrderInput!) {
  createOrder(input: $input) {
    _id
    paymentUrl
    orderPrice
    packageId
    paymentOption
  }
}
    `;

export const useCreateOrderMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateOrderMutation, TError, CreateOrderMutationVariables, TContext>) => {
    
    return useMutation<CreateOrderMutation, TError, CreateOrderMutationVariables, TContext>(
      {
    mutationKey: ['CreateOrder'],
    mutationFn: (variables?: CreateOrderMutationVariables) => axiosGraphQL<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, variables)(),
    ...options
  }
    )};

export const DeleteOrderDocument = `
    mutation DeleteOrder($deleteOrderId: ID!) {
  deleteOrder(id: $deleteOrderId) {
    _id
  }
}
    `;

export const useDeleteOrderMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteOrderMutation, TError, DeleteOrderMutationVariables, TContext>) => {
    
    return useMutation<DeleteOrderMutation, TError, DeleteOrderMutationVariables, TContext>(
      {
    mutationKey: ['DeleteOrder'],
    mutationFn: (variables?: DeleteOrderMutationVariables) => axiosGraphQL<DeleteOrderMutation, DeleteOrderMutationVariables>(DeleteOrderDocument, variables)(),
    ...options
  }
    )};

export const UpdateStatusToPaidDocument = `
    mutation UpdateStatusToPaid($updateStatusToPaidId: ID!) {
  UpdateStatusToPaid(id: $updateStatusToPaidId) {
    message
    status
  }
}
    `;

export const useUpdateStatusToPaidMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateStatusToPaidMutation, TError, UpdateStatusToPaidMutationVariables, TContext>) => {
    
    return useMutation<UpdateStatusToPaidMutation, TError, UpdateStatusToPaidMutationVariables, TContext>(
      {
    mutationKey: ['UpdateStatusToPaid'],
    mutationFn: (variables?: UpdateStatusToPaidMutationVariables) => axiosGraphQL<UpdateStatusToPaidMutation, UpdateStatusToPaidMutationVariables>(UpdateStatusToPaidDocument, variables)(),
    ...options
  }
    )};

export const ChangePasswordDocument = `
    mutation ChangePassword($input: ChangePasswordInput!) {
      changePassword(input: $input) {
        status
        message
      }
    }
    `;

export const UpdateAdminInfoDocument = `
    mutation UpdateAdminInfo($input: UpdateAdminInfoInput!) {
      updateAdminInfo(input: $input) {
        id
        email
        city
        address
        name
        phoneNumber
        postcode
        state
      }
    }
    `;

export const useChangePasswordMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ChangePasswordMutation, TError, ChangePasswordMutationVariables, TContext>) => {
    
    return useMutation<ChangePasswordMutation, TError, ChangePasswordMutationVariables, TContext>(
      {
        mutationKey: ['ChangePassword'],
        mutationFn: (variables?: ChangePasswordMutationVariables) => axiosGraphQL<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, variables)(),
        ...options
      }
)};

export const useUpdateAdminInfoMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateAdminInfoMutation, TError, UpdateAdminInfoMutationVariables, TContext>) => {
    
    return useMutation<UpdateAdminInfoMutation, TError, UpdateAdminInfoMutationVariables, TContext>(
      {
    mutationKey: ['UpdateAdminInfo'],
    mutationFn: (variables?: UpdateAdminInfoMutationVariables) => axiosGraphQL<UpdateAdminInfoMutation, UpdateAdminInfoMutationVariables>(UpdateAdminInfoDocument, variables)(),
    ...options
  }
    )};

export const ProductsDocument = `
    query Products {
  products {
    _id
    createdAt
    published
    allowShipment
    satisfiedCustomers
    slug
    faqs {
      answer {
        en
        ms
      }
      question {
        en
        ms
      }
    }
    sectionColors {
      faqSection
      feedbackSection
      freeGiftSection
      packageSection
      paymentSection
      productSection
    }
    feedback {
      comment
      rating
      isGoogleReview
      customer {
        name
        image
        location
      }
    }
    packages {
      _id
      description {
        en
        ms
      }
      image
      name {
        en
        ms
      }
      price
    }
    images
    name {
      en
      ms
    }
    price
    salePrice
    unitsSold
    updatedAt
    facebookPixel {
      enabled
      settings {
        accessToken
        codeTestEvent
        events
        pixelId
      }
    }
    sections {
      sectionColor
      description {
        ms
        en
      }
      heading {
        en
        ms
      }
      images
      orderIndex
      subheading {
        en
        ms
      }
      type
    }
  }
}
    `;

export const useProductsQuery = <
      TData = ProductsQuery,
      TError = unknown
    >(
      variables?: ProductsQueryVariables,
      options?: Omit<UseQueryOptions<ProductsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ProductsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ProductsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['Products'] : ['Products', variables],
    queryFn: axiosGraphQL<ProductsQuery, ProductsQueryVariables>(ProductsDocument, variables),
    ...options
  }
    )};

export const ProductsForPageDocument = `
    query ProductsForPage($published: Boolean) {
  productsForPage(published: $published) {
    _id
    slug
    avgRating
    images
    price
    salePrice
    name {
      en
      ms
    }
  }
}
    `;

export const useProductsForPageQuery = <
      TData = ProductsForPageQuery,
      TError = unknown
    >(
      variables?: ProductsForPageQueryVariables,
      options?: Omit<UseQueryOptions<ProductsForPageQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ProductsForPageQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ProductsForPageQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['ProductsForPage'] : ['ProductsForPage', variables],
    queryFn: axiosGraphQL<ProductsForPageQuery, ProductsForPageQueryVariables>(ProductsForPageDocument, variables),
    ...options
  }
    )};

export const ProductBySlugDocument = `
    query ProductBySlug($slug: String!) {
  productBySlug(slug: $slug) {
    _id
    createdAt
    faqs {
      answer {
        en
        ms
      }
      question {
        en
        ms
      }
    }
    satisfiedCustomers
    published
    allowShipment
    sectionColors {
      faqSection
      feedbackSection
      freeGiftSection
      packageSection
      paymentSection
      productSection
    }
    facebookPixel {
      enabled
      settings {
        accessToken
        codeTestEvent
        events
        pixelId
      }
    }
    feedback {
      comment
      rating
      isGoogleReview
      customer {
        name
        image
        location
      }
    }
    packages {
      _id
      description {
        en
        ms
      }
      image
      name {
        en
        ms
      }
      price
    }
    images
    name {
      en
      ms
    }
    price
    salePrice
    unitsSold
    updatedAt
    sections {
      sectionColor
      description {
        ms
        en
      }
      heading {
        en
        ms
      }
      images
      orderIndex
      subheading {
        en
        ms
      }
      type
    }
  }
}
    `;

export const useProductBySlugQuery = <
      TData = ProductBySlugQuery,
      TError = unknown
    >(
      variables: ProductBySlugQueryVariables,
      options?: Omit<UseQueryOptions<ProductBySlugQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ProductBySlugQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ProductBySlugQuery, TError, TData>(
      {
    queryKey: ['ProductBySlug', variables],
    queryFn: axiosGraphQL<ProductBySlugQuery, ProductBySlugQueryVariables>(ProductBySlugDocument, variables),
    ...options
  }
    )};

export const ProductByIdDocument = `
    query ProductById($productId: ID!) {
  product(productId: $productId) {
    _id
    createdAt
    faqs {
      answer {
        en
        ms
      }
      question {
        en
        ms
      }
    }
    published
    satisfiedCustomers
    allowShipment
    sectionColors {
      faqSection
      feedbackSection
      freeGiftSection
      packageSection
      paymentSection
      productSection
    }
    facebookPixel {
      enabled
      settings {
        accessToken
        codeTestEvent
        events
        pixelId
      }
    }
    feedback {
      comment
      rating
      isGoogleReview
      customer {
        name
        image
        location
      }
    }
    packages {
      _id
      description {
        en
        ms
      }
      image
      name {
        en
        ms
      }
      price
    }
    images
    name {
      en
      ms
    }
    price
    salePrice
    unitsSold
    updatedAt
    sections {
      sectionColor
      description {
        ms
        en
      }
      heading {
        en
        ms
      }
      images
      orderIndex
      subheading {
        en
        ms
      }
      type
    }
  }
}
    `;

export const useProductByIdQuery = <
      TData = ProductByIdQuery,
      TError = unknown
    >(
      variables: ProductByIdQueryVariables,
      options?: Omit<UseQueryOptions<ProductByIdQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ProductByIdQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ProductByIdQuery, TError, TData>(
      {
    queryKey: ['ProductById', variables],
    queryFn: axiosGraphQL<ProductByIdQuery, ProductByIdQueryVariables>(ProductByIdDocument, variables),
    ...options
  }
    )};

export const CurrentUserDocument = `
    query CurrentUser {
  currentUser {
    id
    isAdmin
    username
    name
    phoneNumber
    address
    city
    postcode
    state
    email
  }
}
    `;

export const useCurrentUserQuery = <
      TData = CurrentUserQuery,
      TError = unknown
    >(
      variables?: CurrentUserQueryVariables,
      options?: Omit<UseQueryOptions<CurrentUserQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<CurrentUserQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<CurrentUserQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['CurrentUser'] : ['CurrentUser', variables],
    queryFn: axiosGraphQL<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, variables),
    ...options
  }
    )};

export const AllStatesDocument = `
    query allStates {
  allStates {
    id
    name
  }
}
    `;

export const useAllStatesQuery = <
      TData = AllStatesQuery,
      TError = unknown
    >(
      variables?: AllStatesQueryVariables,
      options?: Omit<UseQueryOptions<AllStatesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<AllStatesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<AllStatesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['allStates'] : ['allStates', variables],
    queryFn: axiosGraphQL<AllStatesQuery, AllStatesQueryVariables>(AllStatesDocument, variables),
    ...options
  }
    )};

export const GetCitiesByStateDocument = `
    query getCitiesByState($stateName: String!) {
  getCitiesByState(stateName: $stateName) {
    id
    name
  }
}
    `;

export const useGetCitiesByStateQuery = <
      TData = GetCitiesByStateQuery,
      TError = unknown
    >(
      variables: GetCitiesByStateQueryVariables,
      options?: Omit<UseQueryOptions<GetCitiesByStateQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetCitiesByStateQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetCitiesByStateQuery, TError, TData>(
      {
    queryKey: ['getCitiesByState', variables],
    queryFn: axiosGraphQL<GetCitiesByStateQuery, GetCitiesByStateQueryVariables>(GetCitiesByStateDocument, variables),
    ...options
  }
    )};

export const OrdersDocument = `
    query Orders {
  orders {
    _id
    city
    createdAt
    fullAddress
    name
    email
    orderPrice
    packageId
    productId {
      _id
      name {
        en
        ms
      }
    }
    paymentOption
    shippingRegion
    paymentDetails {
      billId
      billUrl
      status
    }
    phoneNumber
    postcode
    state
    updatedAt
  }
}
    `;

export const useOrdersQuery = <
      TData = OrdersQuery,
      TError = unknown
    >(
      variables?: OrdersQueryVariables,
      options?: Omit<UseQueryOptions<OrdersQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<OrdersQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<OrdersQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['Orders'] : ['Orders', variables],
    queryFn: axiosGraphQL<OrdersQuery, OrdersQueryVariables>(OrdersDocument, variables),
    ...options
  }
    )};

export const OrderByIdDocument = `
    query OrderById($id: ID!) {
  orderById(id: $id) {
    _id
    city
    createdAt
    fullAddress
    name
    email
    orderPrice
    packageId
    paymentOption
    paymentDetails {
      billId
      billUrl
      status
    }
    phoneNumber
    postcode
    productId {
      _id
      name {
        en
        ms
      }
      facebookPixel {
        enabled
        settings {
          accessToken
          codeTestEvent
          events
          pixelId
        }
      }
    }
    state
    updatedAt
  }
}
    `;

export const useOrderByIdQuery = <
      TData = OrderByIdQuery,
      TError = unknown
    >(
      variables: OrderByIdQueryVariables,
      options?: Omit<UseQueryOptions<OrderByIdQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<OrderByIdQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<OrderByIdQuery, TError, TData>(
      {
    queryKey: ['OrderById', variables],
    queryFn: axiosGraphQL<OrderByIdQuery, OrderByIdQueryVariables>(OrderByIdDocument, variables),
    ...options
  }
    )};

export const PaginatedOrdersDocument = `
    query PaginatedOrders($limit: Int, $page: Int, $search: String) {
  paginatedOrders(limit: $limit, page: $page, search: $search) {
    results {
      _id
      city
      createdAt
      fullAddress
      name
      email
      orderPrice
      packageId {
        _id
        name {
          en
          ms
        }
      }
      paymentOption
      shippingRegion
      paymentDetails {
        billId
        billUrl
        status
      }
      phoneNumber
      postcode
      productId {
        _id
        name {
          en
          ms
        }
        facebookPixel {
          enabled
          settings {
            accessToken
            codeTestEvent
            events
            pixelId
          }
        }
      }
      state
      updatedAt
    }
    paginatorInfo {
      currentPage
      hasNextPage
      pageSize
      pages
      totalRecords
    }
  }
}
    `;

export const usePaginatedOrdersQuery = <
      TData = PaginatedOrdersQuery,
      TError = unknown
    >(
      variables?: PaginatedOrdersQueryVariables,
      options?: Omit<UseQueryOptions<PaginatedOrdersQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<PaginatedOrdersQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<PaginatedOrdersQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['PaginatedOrders'] : ['PaginatedOrders', variables],
    queryFn: axiosGraphQL<PaginatedOrdersQuery, PaginatedOrdersQueryVariables>(PaginatedOrdersDocument, variables),
    ...options
  }
    )};
