# {{classname}}

All URIs are relative to *https://nft.api.infura.io*

Method | HTTP request | Description
------------- | ------------- | -------------
[**NftsControllerGetTransferForAddress**](TransfersApi.md#NftsControllerGetTransferForAddress) | **Get** /networks/{chainId}/accounts/{walletAddress}/assets/transfers | Gets all NFT transfers by wallet address
[**NftsControllerGetTransfersByBlockNumberOrHash**](TransfersApi.md#NftsControllerGetTransfersByBlockNumberOrHash) | **Get** /networks/{chainId}/nfts/block/transfers | Gets all transfers By block number or hash
[**NftsControllerGetTransfersByTokenAddress**](TransfersApi.md#NftsControllerGetTransfersByTokenAddress) | **Get** /networks/{chainId}/nfts/{tokenAddress}/transfers | Gets all transfers By contract address
[**NftsControllerGetTransfersByTokenId**](TransfersApi.md#NftsControllerGetTransfersByTokenId) | **Get** /networks/{chainId}/nfts/{tokenAddress}/tokens/{tokenId}/transfers | Gets all transfers for an NFT
[**NftsControllerGetTransfersfromBlockToBlock**](TransfersApi.md#NftsControllerGetTransfersfromBlockToBlock) | **Get** /networks/{chainId}/nfts/transfers | Gets all transfers from block to block

# **NftsControllerGetTransferForAddress**
> TransfersModel NftsControllerGetTransferForAddress(ctx, chainId, walletAddress, optional)
Gets all NFT transfers by wallet address

Gets transfers of NFTs for a given wallet address

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
  **chainId** | **string**|  | 
  **walletAddress** | **string**| Wallet address of the sender/recipient of the transfers | 
 **optional** | ***TransfersApiNftsControllerGetTransferForAddressOpts** | optional parameters | nil if no parameters

### Optional Parameters
Optional parameters are passed through a pointer to a TransfersApiNftsControllerGetTransferForAddressOpts struct
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **cursor** | **optional.String**|  | 

### Return type

[**TransfersModel**](TransfersModel.md)

### Authorization

[basic](../README.md#basic)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **NftsControllerGetTransfersByBlockNumberOrHash**
> TransfersModel NftsControllerGetTransfersByBlockNumberOrHash(ctx, chainId, blockHashNumber, optional)
Gets all transfers By block number or hash

Gets transfers by block number or block hash.

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
  **chainId** | **string**|  | 
  **blockHashNumber** | **string**|  | 
 **optional** | ***TransfersApiNftsControllerGetTransfersByBlockNumberOrHashOpts** | optional parameters | nil if no parameters

### Optional Parameters
Optional parameters are passed through a pointer to a TransfersApiNftsControllerGetTransfersByBlockNumberOrHashOpts struct
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **cursor** | **optional.String**|  | 

### Return type

[**TransfersModel**](TransfersModel.md)

### Authorization

[basic](../README.md#basic)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **NftsControllerGetTransfersByTokenAddress**
> TransfersModel NftsControllerGetTransfersByTokenAddress(ctx, chainId, tokenAddress, optional)
Gets all transfers By contract address

Gets transfers by contract address.

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
  **chainId** | **string**|  | 
  **tokenAddress** | **string**| Contract address | 
 **optional** | ***TransfersApiNftsControllerGetTransfersByTokenAddressOpts** | optional parameters | nil if no parameters

### Optional Parameters
Optional parameters are passed through a pointer to a TransfersApiNftsControllerGetTransfersByTokenAddressOpts struct
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **cursor** | **optional.String**|  | 

### Return type

[**TransfersModel**](TransfersModel.md)

### Authorization

[basic](../README.md#basic)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **NftsControllerGetTransfersByTokenId**
> TransfersModel NftsControllerGetTransfersByTokenId(ctx, chainId, tokenAddress, tokenId, optional)
Gets all transfers for an NFT

Gets transfers of an NFT by contract address and token ID.

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
  **chainId** | **string**|  | 
  **tokenAddress** | **string**| Contract address | 
  **tokenId** | **string**|  | 
 **optional** | ***TransfersApiNftsControllerGetTransfersByTokenIdOpts** | optional parameters | nil if no parameters

### Optional Parameters
Optional parameters are passed through a pointer to a TransfersApiNftsControllerGetTransfersByTokenIdOpts struct
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------



 **cursor** | **optional.String**|  | 

### Return type

[**TransfersModel**](TransfersModel.md)

### Authorization

[basic](../README.md#basic)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **NftsControllerGetTransfersfromBlockToBlock**
> TransfersModel NftsControllerGetTransfersfromBlockToBlock(ctx, chainId, fromBlock, toBlock, optional)
Gets all transfers from block to block

Gets transfers from a block to block.

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
  **chainId** | **string**|  | 
  **fromBlock** | **float64**|  | 
  **toBlock** | **float64**|  | 
 **optional** | ***TransfersApiNftsControllerGetTransfersfromBlockToBlockOpts** | optional parameters | nil if no parameters

### Optional Parameters
Optional parameters are passed through a pointer to a TransfersApiNftsControllerGetTransfersfromBlockToBlockOpts struct
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------



 **cursor** | **optional.String**|  | 

### Return type

[**TransfersModel**](TransfersModel.md)

### Authorization

[basic](../README.md#basic)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

