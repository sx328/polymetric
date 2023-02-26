# {{classname}}

All URIs are relative to *https://nft.api.infura.io*

Method | HTTP request | Description
------------- | ------------- | -------------
[**NftsControllerGetNftMetadata**](MetadataApi.md#NftsControllerGetNftMetadata) | **Get** /networks/{chainId}/nfts/{tokenAddress}/tokens/{tokenId} | Gets NFT metadata
[**NftsControllerGetNftsForAddress**](MetadataApi.md#NftsControllerGetNftsForAddress) | **Get** /networks/{chainId}/accounts/{walletAddress}/assets/nfts | Gets all NFTs with metadata currently owned by a given wallet address
[**NftsControllerSearchNfts**](MetadataApi.md#NftsControllerSearchNfts) | **Get** /networks/{chainId}/nfts/search | Search for Nfts given a string

# **NftsControllerGetNftMetadata**
> MetadataModel NftsControllerGetNftMetadata(ctx, chainId, tokenAddress, tokenId, optional)
Gets NFT metadata

Gets NFT data for the given NFT token ID and contract address.

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
  **chainId** | **string**|  | 
  **tokenAddress** | **string**| Contract address | 
  **tokenId** | **string**|  | 
 **optional** | ***MetadataApiNftsControllerGetNftMetadataOpts** | optional parameters | nil if no parameters

### Optional Parameters
Optional parameters are passed through a pointer to a MetadataApiNftsControllerGetNftMetadataOpts struct
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------



 **resyncMetadata** | **optional.String**|  | 

### Return type

[**MetadataModel**](MetadataModel.md)

### Authorization

[basic](../README.md#basic)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **NftsControllerGetNftsForAddress**
> NftModel NftsControllerGetNftsForAddress(ctx, chainId, walletAddress, optional)
Gets all NFTs with metadata currently owned by a given wallet address

Gets all NFTs owned by a given wallet address.

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
  **chainId** | **string**|  | 
  **walletAddress** | **string**| Wallet address | 
 **optional** | ***MetadataApiNftsControllerGetNftsForAddressOpts** | optional parameters | nil if no parameters

### Optional Parameters
Optional parameters are passed through a pointer to a MetadataApiNftsControllerGetNftsForAddressOpts struct
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

# **NftsControllerSearchNfts**
> SearchNftModel NftsControllerSearchNfts(ctx, chainId, query, optional)
Search for Nfts given a string

Search for Nfts given a string

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
  **chainId** | **string**|  | 
  **query** | **string**| Query to search with | 
 **optional** | ***MetadataApiNftsControllerSearchNftsOpts** | optional parameters | nil if no parameters

### Optional Parameters
Optional parameters are passed through a pointer to a MetadataApiNftsControllerSearchNftsOpts struct
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **cursor** | **optional.String**|  | 

### Return type

[**SearchNftModel**](SearchNftModel.md)

### Authorization

[basic](../README.md#basic)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

