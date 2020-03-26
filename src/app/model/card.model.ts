import { Serializable } from './serializable.interface';
import { Unserializable } from './unserializable.interface';

export class Card implements Serializable, Unserializable {

  name: '';

  cover: '';

  image: '';

  sprite: number[];

  deserialize(input: any): this {
    this.name = input.name;
    this.cover = input.cover;
    this.image = input.image;
    this.sprite = input.sprite;
    return this;
  }

  serialize() {
    return {
      name: this.name
    };
  }

}
