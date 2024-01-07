// ポケモンデータの型を定義します。これはAPIから取得するデータの形状に基づいています。
interface Pokemon {
  name: string;
  types: Array<{ type: { name: string } }>;
  weight: number;
  height: number;
  abilities: Array<{ ability: { name: string } }>;
  sprites: { front_default: string };
  url: string;
}
