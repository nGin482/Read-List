import { Character } from "./Character";
import { Collection } from "./CollectionModel";
import { Fandom } from "./Fandom";
import { Story } from "./Story";

Fandom.sync();
Character.sync();
Story.sync();
Collection.sync();

export { Character, Fandom, Story };
