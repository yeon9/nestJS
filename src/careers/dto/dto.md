# DTO (Data Transfer Object)

## What is DTO?

DTO is used in order to validate incoming requests.

DTO is more of a guideline for the developer and those who consume the API to know what kind of shape the request body expects to be, it doesn't actually run any validations on its own. <br/>

## <br/>Why we should use DTO?

DTO is an object that defines how data will be sent over the network.
Interfaces are used for type-checking and defining the types of data that can be passed to a controller or a Nest service.

## <br/>How can we use it?

We want to create an endpoint to add a product, and we want to validate this product before entering into service. we want to validate it at the controller level.

We nees to create our DTO class, with the fields that should be validated(we should install the library class-validator to validate the data)

```
import { IsString, MaxLength } from 'class-validator';

export class ProductDto {
    @IsString()
    @MaxLength(100)
    product_name: string;

    @IsString()
    @MaxLength(20)
    product_code: string;
}
```

now we want to add an enum field name product_type and want to validate via DTO

```
import { IsString, MaxLength, ValidateIf, IsIn } from 'class-validator';

export class ProductDto {

    @IsString()
    @MaxLength(100)
    product_name: string;

    @IsOptional()
    @IsString()
    @MaxLength(20)
    product_code: string;

    @ValidateIf( (o) => o.operational_type !== '' )
    @IsIn(['Goods', 'Services'])
    @IsString()
    @MaxLength(8)
    product_type: string;

}
```

We can validate not only a single field but also can validated an array of objects with DTO in NestJS.
We need to use a class transformer for this. For example we have a product array where we need to validate multiple product objects. We will just make a type of array then we will validate it.

```
import { IsString, MaxLength, ValidateIf, IsIn, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class mainDto{
    @ValidateNested({ each: true })
    @Type( () => product)
    product_data: product[];
}

class product{
    @IsString()
    @MaxLength(100)
    product_name: string;

    @IsOptional()
    @IsString()
    @MaxLength(20)
    product_code: string;

    @ValidateIf( (o) => o.operational_type !== '')
    @IsIn(['Goods', 'Services'])
    @IsString()
    @MaxLength(8)
    product_type: string;
}

```

Key Points!
DTOs are used to reduce code duplication

In order to achieve partial validation, you can use PartialType utility function.

```
export class UpdateProductDto extends PartialType(ProductDto) {}
```

PartialType() function is imported from the @nestjs/swagger package.
