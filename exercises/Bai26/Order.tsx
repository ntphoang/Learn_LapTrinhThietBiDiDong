import { Text, View } from "react-native";

export class Product {
  name: string;
  price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
}

export class Order {
  products: Product[];

  constructor(products: Product[]) {
    this.products = products;
  }

  calculateTotal(): number {
    return this.products.reduce(
      (total, product) => total + product.price,
      0
    );
  }

  showInfo() {
    return (
      <View>
        {this.products.map((product, index) => (
          <Text key={index}>
            {product.name}: ${product.price}
          </Text>
        ))}

        <Text>Total: ${this.calculateTotal()}</Text>
      </View>
    );
  }
}