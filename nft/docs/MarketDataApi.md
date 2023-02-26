# {{classname}}

All URIs are relative to *https://nft.api.infura.io*

Method | HTTP request | Description
------------- | ------------- | -------------
[**NftsControllerGetTradePrice**](MarketDataApi.md#NftsControllerGetTradePrice) | **Get** /networks/{chainId}/nfts/{tokenAddress}/tradePrice | Gets the lowest ETH based price for the contract.

# **NftsControllerGetTradePrice**
> TradePriceModel NftsControllerGetTradePrice(ctx, chainId, tokenAddress)
Gets the lowest ETH based price for the contract.

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
  **chainId** | **string**|  | 
  **tokenAddress** | **string**| Contract address | 

### Return type

[**TradePriceModel**](TradePriceModel.md)

### Authorization

[basic](../README.md#basic)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

