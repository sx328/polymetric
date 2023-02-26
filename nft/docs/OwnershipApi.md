# {{classname}}

All URIs are relative to *https://nft.api.infura.io*

Method | HTTP request | Description
------------- | ------------- | -------------
[**NftsControllerGetOwnersByContract**](OwnershipApi.md#NftsControllerGetOwnersByContract) | **Get** /networks/{chainId}/nfts/{tokenAddress}/owners | Gets NFT owners by contract address
[**NftsControllerGetOwnersByTokenId**](OwnershipApi.md#NftsControllerGetOwnersByTokenId) | **Get** /networks/{chainId}/nfts/{tokenAddress}/{tokenId}/owners | Gets NFT owners by contract address and tokenId

# **NftsControllerGetOwnersByContract**
> OwnersModel NftsControllerGetOwnersByContract(ctx, chainId, tokenAddress, optional)
Gets NFT owners by contract address

 Gets NFT owners given a token address

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
  **chainId** | **string**|  | 
  **tokenAddress** | **string**| Contract address | 
 **optional** | ***OwnershipApiNftsControllerGetOwnersByContractOpts** | optional parameters | nil if no parameters

### Optional Parameters
Optional parameters are passed through a pointer to a OwnershipApiNftsControllerGetOwnersByContractOpts struct
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **cursor** | **optional.String**|  | 

### Return type

[**OwnersModel**](OwnersModel.md)

### Authorization

[basic](../README.md#basic)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **NftsControllerGetOwnersByTokenId**
> OwnersModel NftsControllerGetOwnersByTokenId(ctx, chainId, tokenAddress, tokenId, optional)
Gets NFT owners by contract address and tokenId

Gets NFT owners for a specific token address and a tokenId

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
  **chainId** | **string**|  | 
  **tokenAddress** | **string**|  | 
  **tokenId** | **string**|  | 
 **optional** | ***OwnershipApiNftsControllerGetOwnersByTokenIdOpts** | optional parameters | nil if no parameters

### Optional Parameters
Optional parameters are passed through a pointer to a OwnershipApiNftsControllerGetOwnersByTokenIdOpts struct
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------



 **cursor** | **optional.String**|  | 

### Return type

[**OwnersModel**](OwnersModel.md)

### Authorization

[basic](../README.md#basic)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

