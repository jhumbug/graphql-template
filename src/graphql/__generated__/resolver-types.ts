/* eslint-disable */
// This file was automatically generated and should not be edited.
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '../src/graphql/context';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Datetime: any;
  Sort: any;
};


export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type Query = {
  __typename?: 'Query';
  myField: Maybe<Scalars['String']>;
  rickAndMorty: Maybe<RickAndMortyCharacter>;
};


export type QueryRickAndMortyArgs = {
  id: Maybe<Scalars['Int']>;
};

export type RickAndMortyCharacter = {
  __typename?: 'RickAndMortyCharacter';
  id: Scalars['ID'];
  name: Maybe<Scalars['String']>;
  status: Maybe<Scalars['String']>;
  species: Maybe<Scalars['String']>;
  origin: Maybe<RickAndMortyCharacterOrigin>;
  image: Maybe<Scalars['String']>;
};

export type RickAndMortyCharacterOrigin = {
  __typename?: 'RickAndMortyCharacterOrigin';
  name: Maybe<Scalars['String']>;
  url: Maybe<Scalars['String']>;
};


export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  CacheControlScope: CacheControlScope;
  Datetime: ResolverTypeWrapper<Scalars['Datetime']>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  RickAndMortyCharacter: ResolverTypeWrapper<RickAndMortyCharacter>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  RickAndMortyCharacterOrigin: ResolverTypeWrapper<RickAndMortyCharacterOrigin>;
  Sort: ResolverTypeWrapper<Scalars['Sort']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Datetime: Scalars['Datetime'];
  Query: {};
  String: Scalars['String'];
  Int: Scalars['Int'];
  RickAndMortyCharacter: RickAndMortyCharacter;
  ID: Scalars['ID'];
  RickAndMortyCharacterOrigin: RickAndMortyCharacterOrigin;
  Sort: Scalars['Sort'];
  Boolean: Scalars['Boolean'];
}>;

export type CacheControlDirectiveArgs = {   maxAge: Maybe<Scalars['Int']>;
  scope: Maybe<CacheControlScope>; };

export type CacheControlDirectiveResolver<Result, Parent, ContextType = Context, Args = CacheControlDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface DatetimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Datetime'], any> {
  name: 'Datetime';
}

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  myField: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rickAndMorty: Resolver<Maybe<ResolversTypes['RickAndMortyCharacter']>, ParentType, ContextType, RequireFields<QueryRickAndMortyArgs, never>>;
}>;

export type RickAndMortyCharacterResolvers<ContextType = Context, ParentType extends ResolversParentTypes['RickAndMortyCharacter'] = ResolversParentTypes['RickAndMortyCharacter']> = ResolversObject<{
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  species: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  origin: Resolver<Maybe<ResolversTypes['RickAndMortyCharacterOrigin']>, ParentType, ContextType>;
  image: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RickAndMortyCharacterOriginResolvers<ContextType = Context, ParentType extends ResolversParentTypes['RickAndMortyCharacterOrigin'] = ResolversParentTypes['RickAndMortyCharacterOrigin']> = ResolversObject<{
  name: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface SortScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Sort'], any> {
  name: 'Sort';
}

export type Resolvers<ContextType = Context> = ResolversObject<{
  Datetime: GraphQLScalarType;
  Query: QueryResolvers<ContextType>;
  RickAndMortyCharacter: RickAndMortyCharacterResolvers<ContextType>;
  RickAndMortyCharacterOrigin: RickAndMortyCharacterOriginResolvers<ContextType>;
  Sort: GraphQLScalarType;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = Context> = ResolversObject<{
  cacheControl: CacheControlDirectiveResolver<any, any, ContextType>;
}>;


/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = Context> = DirectiveResolvers<ContextType>;