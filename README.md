#SNS-FILTER-POLICY
Cloudformation Custom Resource for SNS Filter Policies

## Input:

```yaml
#required
SubscriptionArn: The subscription which should the filter policy added to
FilterPolicy: List of Attribute/Policy objects
```

##Example

```yaml
SnsFilterPolicy: 
  Type: "Custom::SnsFilterPolicy"
  Properties: 
    ServiceToken:
      !Sub |
        arn:aws:lambda:${AWS::Region}:${AWS::AccountId}:function:${LambdaFunctionName}
    SubscriptionArn: Ref(Subscription)
    FilterPolicy:
      #Exact matching (whitelisting)
      - Attribute: customer_interests
        Policy: '["rugby"]'
      #Prefix matching
      - Attribute: customer_interests
        Policy: '[{"prefix":"bas"}]'
      #Anything-but matching (blacklisting)
      - Attribute: customer_interests
        Policy: '["customer_interests": [{"anything-but":"rugby"}]'
      # Numeric exact matching
      - Attribute: "price_usd"
        Policy: '[{"numeric":["=",301.5]}]'
      #Range matching
      - Atttribute: "price_usd"
        Policy: '[{"numeric":[">", 0, "<=", 150]}]'
    StackName: 
      Ref: "StackName"      
```


For more information see
https://docs.aws.amazon.com/sns/latest/dg/message-filtering.html