import { Chara } from "./Chara";

class Board {

    items: BoardItem[] = [];
    

    static addToBoard(b: Board, text: string, color: ItemColor, origin: ItemOrigin) {
      const bi = new BoardItem();
      bi.text = text;
      bi.color = color;
      bi.origin = origin;
      b.items.push(bi);
    }

    static narrate(b: Board, text: string) {
        this.addToBoard(b, text, "#000", {type: "narrate", sender: "narration"});
    }

    static charaEmit(b: Board, text: string, c: Chara) {
        this.addToBoard(b, text, "blue", {type: "chara-emit", sender: c.familiarName});
    }

    static chat(b:Board, name: string, text: string) {
        this.addToBoard(b, text, "green", {type: "chat", sender: name});
    }
}

class BoardItem {
    color: ItemColor = "#000";
    origin: ItemOrigin = {"type": "chara-emit", "sender": "narration"};
    text: string = "";

}


type ItemOrigin = 
  | {"type": "chat", "sender": string}
  | {"type": "narrate", "sender": string}
  | {"type": "chara-emit", "sender": string};

type NamedColors = 
  | "aliceblue" | "antiquewhite" | "aqua" | "aquamarine" | "azure" 
  | "beige" | "bisque" | "black" | "blanchedalmond" | "blue" 
  | "blueviolet" | "brown" | "burlywood" | "cadetblue" | "chartreuse" 
  | "chocolate" | "coral" | "cornflowerblue" | "cornsilk" | "crimson" 
  | "cyan" | "darkblue" | "darkcyan" | "darkgoldenrod" | "darkgray" 
  | "darkgreen" | "darkkhaki" | "darkmagenta" | "darkolivegreen" 
  | "darkorange" | "darkorchid" | "darkred" | "darksalmon" 
  | "darkseagreen" | "darkslateblue" | "darkslategray" | "darkturquoise" 
  | "darkviolet" | "deeppink" | "deepskyblue" | "dimgray" | "dodgerblue" 
  | "firebrick" | "floralwhite" | "forestgreen" | "fuchsia" | "gainsboro" 
  | "ghostwhite" | "gold" | "goldenrod" | "gray" | "green" | "greenyellow" 
  | "honeydew" | "hotpink" | "indianred" | "indigo" | "ivory" | "khaki" 
  | "lavender" | "lavenderblush" | "lawngreen" | "lemonchiffon" | "lightblue" 
  | "lightcoral" | "lightcyan" | "lightgoldenrodyellow" | "lightgray" 
  | "lightgreen" | "lightpink" | "lightsalmon" | "lightseagreen" 
  | "lightskyblue" | "lightslategray" | "lightsteelblue" | "lightyellow" 
  | "lime" | "limegreen" | "linen" | "magenta" | "maroon" | "mediumaquamarine" 
  | "mediumblue" | "mediumorchid" | "mediumpurple" | "mediumseagreen" 
  | "mediumslateblue" | "mediumspringgreen" | "mediumturquoise" 
  | "mediumvioletred" | "midnightblue" | "mintcream" | "mistyrose" 
  | "moccasin" | "navajowhite" | "navy" | "oldlace" | "olive" | "olivedrab" 
  | "orange" | "orangered" | "orchid" | "palegoldenrod" | "palegreen" 
  | "paleturquoise" | "palevioletred" | "papayawhip" | "peachpuff" 
  | "peru" | "pink" | "plum" | "powderblue" | "purple" | "rebeccapurple" 
  | "red" | "rosybrown" | "royalblue" | "saddlebrown" | "salmon" 
  | "sandybrown" | "seagreen" | "seashell" | "sienna" | "silver" 
  | "skyblue" | "slateblue" | "slategray" | "snow" | "springgreen" 
  | "steelblue" | "tan" | "teal" | "thistle" | "tomato" | "turquoise" 
  | "violet" | "wheat" | "white" | "whitesmoke" | "yellow" | "yellowgreen";

type HexColor = `#${string}`;
type RGBColor = `rgb(${number},${number},${number})`;
type RGBAColor = `rgba(${number},${number},${number},${number})`;

type ItemColor = NamedColors | HexColor | RGBColor | RGBAColor;


export { Board };