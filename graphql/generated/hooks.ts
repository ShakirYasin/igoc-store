import { useQuery, UseQueryOptions } from '@tanstack/react-query';
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
  price: Scalars['Float']['input'];
  salePrice?: InputMaybe<Scalars['Float']['input']>;
  sections: Array<SectionInput>;
  totalUnits: Scalars['Int']['input'];
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
  comment?: Maybe<MultilingualString>;
  rating?: Maybe<Scalars['Float']['output']>;
};

export type FeedbackInput = {
  comment: MultilingualStringInput;
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
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};

export type Product = {
  __typename?: 'Product';
  _id?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  faqs?: Maybe<Array<Faq>>;
  feedback?: Maybe<Array<Feedback>>;
  images?: Maybe<Array<Scalars['String']['output']>>;
  name?: Maybe<MultilingualString>;
  price?: Maybe<Scalars['Float']['output']>;
  salePrice?: Maybe<Scalars['Float']['output']>;
  satisfiedCustomers?: Maybe<Scalars['Int']['output']>;
  sections?: Maybe<Array<Section>>;
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
};

export type Query = {
  __typename?: 'Query';
  product?: Maybe<Product>;
  products?: Maybe<Array<Product>>;
  productsForPage?: Maybe<Array<ProductPageInfo>>;
};


export type QueryProductArgs = {
  productId: Scalars['ID']['input'];
};

export type Section = {
  __typename?: 'Section';
  description?: Maybe<MultilingualString>;
  heading?: Maybe<MultilingualString>;
  images?: Maybe<Array<Scalars['String']['output']>>;
  orderIndex?: Maybe<Scalars['Int']['output']>;
  subheading?: Maybe<MultilingualString>;
  type?: Maybe<Scalars['String']['output']>;
};

export type SectionInput = {
  description: MultilingualStringInput;
  heading: MultilingualStringInput;
  images: Array<Scalars['String']['input']>;
  orderIndex: Scalars['Int']['input'];
  subheading: MultilingualStringInput;
  type: SectionType;
};

export enum SectionType {
  Normal = 'NORMAL',
  Warning = 'WARNING'
}

export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQuery = { __typename?: 'Query', products?: Array<{ __typename?: 'Product', _id?: string | null, createdAt?: any | null, images?: Array<string> | null, price?: number | null, salePrice?: number | null, satisfiedCustomers?: number | null, totalUnits?: number | null, unitsSold?: number | null, updatedAt?: any | null, faqs?: Array<{ __typename?: 'FAQ', answer?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null, question?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null }> | null, feedback?: Array<{ __typename?: 'Feedback', rating?: number | null, comment?: { __typename?: 'MultilingualString', ms?: string | null, en?: string | null } | null }> | null, name?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null, sections?: Array<{ __typename?: 'Section', images?: Array<string> | null, orderIndex?: number | null, type?: string | null, description?: { __typename?: 'MultilingualString', ms?: string | null, en?: string | null } | null, heading?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null, subheading?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null }> | null }> | null };

export type ProductsForPageQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsForPageQuery = { __typename?: 'Query', productsForPage?: Array<{ __typename?: 'ProductPageInfo', _id?: string | null, avgRating?: number | null, images?: Array<string> | null, price?: number | null, salePrice?: number | null, name?: { __typename?: 'MultilingualString', en?: string | null, ms?: string | null } | null }> | null };



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
    feedback {
      comment {
        ms
        en
      }
      rating
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
