# {{classname}}

All URIs are relative to *https://nft.api.infura.io*

Method | HTTP request | Description
------------- | ------------- | -------------
[**NftsControllerGetCollectionMetadata**](CollectionsApi.md#NftsControllerGetCollectionMetadata) | **Get** /networks/{chainId}/nfts/{tokenAddress} | Gets collection level metadata
[**NftsControllerGetCollectionsByWalletAddress**](CollectionsApi.md#NftsControllerGetCollectionsByWalletAddress) | **Get** /networks/{chainId}/accounts/{walletAddress}/assets/collections | Gets collections by wallet address
[**NftsControllerGetNftsForCollection**](CollectionsApi.md#NftsControllerGetNftsForCollection) | **Get** /networks/{chainId}/nfts/{tokenAddress}/tokens | Gets all NFTs with metadata in a specific collection

# **NftsControllerGetCollectionMetadata**
> CollectionModel NftsControllerGetCollectionMetadata(ctx, chainId, tokenAddress)
Gets collection level metadata

Gets the contract level metadata for a given contract address.

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
  **chainId** | **string**|  | 
  **tokenAddress** | **string**| Contract address | 

### Return type

[**CollectionModel**](CollectionModel.md)

### Authorization

[basic](../README.md#basic)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **NftsControllerGetCollectionsByWalletAddress**
> CollectionByWalletModel NftsControllerGetCollectionsByWalletAddress(ctx, chainId, walletAddress, optional)
Gets collections by wallet address

Gets NFT collections owned by a given wallet address.

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
  **chainId** | **string**|  | 
  **walletAddress** | **string**| Wallet address of the owner of Nfts in collection | 
 **optional** | ***CollectionsApiNftsControllerGetCollectionsByWalletAddressOpts** | optional parameters | nil if no parameters

### Optional Parameters
Optional parameters are passed through a pointer to a CollectionsApiNftsControllerGetCollectionsByWalletAddressOpts struct
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **cursor** | **optional.String**|  | 

### Return type

[**CollectionByWalletModel**](CollectionByWalletModel.md)

### Authorization

[basic](../README.md#basic)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **NftsControllerGetNftsForCollection**
> NftModel NftsControllerGetNftsForCollection(ctx, chainId, tokenAddress, optional)
Gets all NFTs with metadata in a specific collection

Gets all NFTs for a given contract address (including metadata).

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
  **chainId** | **string**|  | 
  **tokenAddress** | **string**| Contract address | 
 **optional** | ***CollectionsApiNftsControllerGetNftsForCollectionOpts** | optional parameters | nil if no parameters

### Optional Parameters
Optional parameters are passed through a pointer to a CollectionsApiNftsControllerGetNftsForCollectionOpts struct
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **cursor** | **optional.String**|  | 

### Return type

[**NftModel**](NftModel.md)

### Authorization

[basic](../README.md#basic)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

