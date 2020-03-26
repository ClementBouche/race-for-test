import { Serializable } from './serializable.interface';
import { Unserializable } from './unserializable.interface';
import { Card } from './card.model';

export class Room implements Serializable, Unserializable {

  name: string;

  players: {
    username: string,
    plateau: Card[],
    hand: Card[],
    vp: number
  };

  draw: Card[];

  discard: Card[];

  stock: {
    vp: number
  };

  deserialize(input: any): this {
    this.players = input.players.map(pl => {
      return {
        username: pl.username,
        plateau: pl.plateau.map((c) => new Card().deserialize(c)),
        hand: pl.hand.map((c) => new Card().deserialize(c)),
        vp: pl.vp
      }
    });
    this.draw = input.draw.map((c) => new Card().deserialize(c));
    this.discard = input.discard.map((c) => new Card().deserialize(c));
    this.stock = {
      vp: input.vp
    };
    return this;
  };

  serialize() {
    return {
      name: this.name
    };
  };

}
