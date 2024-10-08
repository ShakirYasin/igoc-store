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

export type CreateProductInput = {
  faqs?: InputMaybe<Array<FaqInput>>;
  feedback?: InputMaybe<Array<FeedbackInput>>;
  images: Array<Scalars['String']['input']>;
  name: MultilingualStringInput;
  packages?: InputMaybe<Array<PackageInput>>;
  price: Scalars['Float']['input'];
  salePrice?: InputMaybe<Scalars['Float']['input']>;
  sectionColors?: InputMaybe<SectionColorsInput>;
  sections: Array<SectionInput>;
  slug: Scalars['String']['input'];
  totalUnits: Scalars['Int']['input'];
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
  createProduct?: Maybe<Product>;
  deleteAllProducts?: Maybe<Scalars['Int']['output']>;
  deleteProductById?: Maybe<Product>;
  deleteProductBySlug?: Maybe<Product>;
  updateProductById?: Maybe<Product>;
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationDeleteProductByIdArgs = {
  input: DeleteProductByIdInput;
};


export type MutationDeleteProductBySlugArgs = {
  input: DeleteProductBySlugInput;
};


export type MutationUpdateProductByIdArgs = {
  input: UpdateProductByIdInput;
};

export type Package = {
  __typename?: 'Package';
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

export type Product = {
  __typename?: 'Product';
  _id?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  faqs?: Maybe<Array<Faq>>;
  feedback?: Maybe<Array<Feedback>>;
  images?: Maybe<Array<Scalars['String']['output']>>;
  name?: Maybe<MultilingualString>;
  packages?: Maybe<Array<Package>>;
  price?: Maybe<Scalars['Float']['output']>;
  salePrice?: Maybe<Scalars['Float']['output']>;
  satisfiedCustomers?: Maybe<Scalars['Int']['output']>;
  sectionColors?: Maybe<SectionColors>;
  sections?: Maybe<Array<Section>>;
  slug?: Maybe<Scalars['String']['output']>;
  totalUnits?: Maybe<Scalars['Int']['output']>;
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
  product?: Maybe<Product>;
  productBySlug?: Maybe<Product>;
  products?: Maybe<Array<Product>>;
  productsForPage?: Maybe<Array<ProductPageInfo>>;
};


export type QueryProductArgs = {
  productId: Scalars['ID']['input'];
};


export type QueryProductBySlugArgs = {
  slug: Scalars['String']['input'];
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
  sectionColor?: InputMaybe<Scalars['String']['input']>;
  subheading: MultilingualStringInput;
  type: SectionType;
};

export enum SectionType {
  Normal = 'NORMAL',
  Warning = 'WARNING'
}

export type UpdateProductByIdInput = {
  data: UpdateProductInput;
  id: Scalars['ID']['input'];
};

export type UpdateProductInput = {
  faqs?: InputMaybe<Array<FaqInput>>;
  feedback?: InputMaybe<Array<FeedbackInput>>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<MultilingualStringInput>;
  packages?: InputMaybe<Array<PackageInput>>;
  price?: InputMaybe<Scalars['Float']['input']>;
  salePrice?: InputMaybe<Scalars['Float']['input']>;
  sectionColors?: InputMaybe<SectionColorsInput>;
  sections?: InputMaybe<Array<SectionInput>>;
  totalUnits?: InputMaybe<Scalars['Int']['input']>;
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

export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQuery = { __typename?: 'Query', products?: Array<{ __typename?: 'Product', _id?: string | null, createdAt?: any | null, images?: Array<string> | null, price?: number | null, salePrice?: number | null, satisfiedCustomers?: number | null, totalUnits?: number | null, unitsSold?: number | null, updatedAt?: any | null, faqs?: Array<{ __typename?: 'FAQ', answer?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null, question?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null }> | null, sectionColors?: { __typename?: 'SectionColors', faqSection?: string | null, feedbackSection?: string | null, freeGiftSection?: string | null, packageSection?: string | null, paymentSection?: string | null, productSection?: string | null } | null, feedback?: Array<{ __typename?: 'Feedback', comment?: string | null, rating?: number | null, isGoogleReview?: boolean | null, customer?: { __typename?: 'Customer', name?: string | null, image?: string | null, location?: string | null } | null }> | null, packages?: Array<{ __typename?: 'Package', image?: string | null, price?: number | null, description?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null, name?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null }> | null, name?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null, sections?: Array<{ __typename?: 'Section', sectionColor?: string | null, images?: Array<string> | null, orderIndex?: number | null, type?: string | null, description?: { __typename?: 'MultilingualString', ms?: string | null, en?: string | null } | null, heading?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null, subheading?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null }> | null }> | null };

export type ProductsForPageQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsForPageQuery = { __typename?: 'Query', productsForPage?: Array<{ __typename?: 'ProductPageInfo', _id?: string | null, slug?: string | null, avgRating?: number | null, images?: Array<string> | null, price?: number | null, salePrice?: number | null, name?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null }> | null };

export type ProductBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type ProductBySlugQuery = { __typename?: 'Query', productBySlug?: { __typename?: 'Product', _id?: string | null, createdAt?: any | null, images?: Array<string> | null, price?: number | null, salePrice?: number | null, satisfiedCustomers?: number | null, totalUnits?: number | null, unitsSold?: number | null, updatedAt?: any | null, faqs?: Array<{ __typename?: 'FAQ', answer?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null, question?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null }> | null, sectionColors?: { __typename?: 'SectionColors', faqSection?: string | null, feedbackSection?: string | null, freeGiftSection?: string | null, packageSection?: string | null, paymentSection?: string | null, productSection?: string | null } | null, feedback?: Array<{ __typename?: 'Feedback', comment?: string | null, rating?: number | null, isGoogleReview?: boolean | null, customer?: { __typename?: 'Customer', name?: string | null, image?: string | null, location?: string | null } | null }> | null, packages?: Array<{ __typename?: 'Package', image?: string | null, price?: number | null, description?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null, name?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null }> | null, name?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null, sections?: Array<{ __typename?: 'Section', sectionColor?: string | null, images?: Array<string> | null, orderIndex?: number | null, type?: string | null, description?: { __typename?: 'MultilingualString', ms?: string | null, en?: string | null } | null, heading?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null, subheading?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null }> | null } | null };

export type ProductByIdQueryVariables = Exact<{
  productId: Scalars['ID']['input'];
}>;


export type ProductByIdQuery = { __typename?: 'Query', product?: { __typename?: 'Product', _id?: string | null, createdAt?: any | null, images?: Array<string> | null, price?: number | null, salePrice?: number | null, satisfiedCustomers?: number | null, totalUnits?: number | null, unitsSold?: number | null, updatedAt?: any | null, faqs?: Array<{ __typename?: 'FAQ', answer?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null, question?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null }> | null, sectionColors?: { __typename?: 'SectionColors', faqSection?: string | null, feedbackSection?: string | null, freeGiftSection?: string | null, packageSection?: string | null, paymentSection?: string | null, productSection?: string | null } | null, feedback?: Array<{ __typename?: 'Feedback', comment?: string | null, rating?: number | null, isGoogleReview?: boolean | null, customer?: { __typename?: 'Customer', name?: string | null, image?: string | null, location?: string | null } | null }> | null, packages?: Array<{ __typename?: 'Package', image?: string | null, price?: number | null, description?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null, name?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null }> | null, name?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null, sections?: Array<{ __typename?: 'Section', sectionColor?: string | null, images?: Array<string> | null, orderIndex?: number | null, type?: string | null, description?: { __typename?: 'MultilingualString', ms?: string | null, en?: string | null } | null, heading?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null, subheading?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null }> | null } | null };



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

export const ProductsDocument = `
    query Products {
  products {
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
    satisfiedCustomers
    totalUnits
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
    query ProductsForPage {
  productsForPage {
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
    satisfiedCustomers
    totalUnits
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
    satisfiedCustomers
    totalUnits
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
