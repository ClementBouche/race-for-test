import { Serializable } from './serializable.interface';
import { Unserializable } from './unserializable.interface';
import { Card } from './card.model';

export class Room implements Serializable, Unserializable {

  id: string;
  name: string;
  maxPlayers: number;
  users: string[];
  gameName: string;

  createdAt: string;
  updatedAt: string;

  game: {
    name: string,
    coverImage: string,
    players: [{
      username: string,
      color: string,
      hand: Card[],
      discard: Card[],
      draw: Card[],
      plateau: Card[],
      vp: number,
    }],
    reserve: {
      draw: Card[],
      discard: Card[],
      vp: number,
      market: Card[],
      explorers: Card[]
    }
  };

  deserialize(input: any): this {
    // players
    const players = input.game && input.game.players ? input.game.players.map((pl: any) => {
      return {
        // all
        username: pl.username,
        color: pl.color,
        // racefor && startrea
        hand: pl.hand.map((c) => new Card().deserialize(c)),
        // racefor
        plateau: pl.plateau ? pl.plateau.map((c) => new Card().deserialize(c)) : [],
        vp: pl.vp,
        // startrea
        discard: pl.discard ? pl.discard.map((c) => new Card().deserialize(c)) : [],
        draw: pl.draw ? pl.draw.map((c) => new Card().deserialize(c)) : [],
      }
    }) : [];
    // reserve
    const reserve = input.game && input.game.reserve ? {
      // racefor && startrea
      draw: input.game.reserve.draw ? input.game.reserve.draw.map((c) => new Card().deserialize(c)) : [],
      discard: input.game.reserve.discard ? input.game.reserve.discard.map((c) => new Card().deserialize(c)) : [],
      // racefor
      vp: input.game.reserve.vp ? input.game.reserve.vp : null,
      // startrea
      market: input.game.reserve.market ? input.game.reserve.market.map((c) => new Card().deserialize(c)) : [],
      explorers: input.game.reserve.explorers ? input.game.reserve.explorers.map((c) => new Card().deserialize(c)) : [],
    } : null;
    // properties
    const properties = input.game && input.game.properties ? input.game.properties : [];
    // other stuff
    return Object.assign(this, {
      id: input._id,
      name: input.name,
      maxPlayers: input.maxPlayers,
      users: input.users,
      gameName: input.gameName,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
      game: {
        name: input.game ? input.game.name : null,
        coverImage: input.game ? input.game.coverImage : null,
        players: players,
        reserve: reserve,
        properties: properties,
      }
    });
  };

  serialize() {
    return {
      name: this.name
    };
  };

}
