# MongoDB Aggregate Framework Examples

## aggregate-3.6.js
Find by product.id = "Prod-493875" using `$expr` to retrieve selected fields from classification and attribute collections.

```
mongo DEV_EN_All_All --quiet < aggregate-3.6.js
```

## aggregate-func-3.6.js
Make the aggregate command a function and pass variable as a `--eval` parameter.

```
mongo DEV_EN_All_All --quiet --eval 'var x="Prod-3759305";' aggregate-func-3.6.js
```

