import { Character } from "./Character";
import { Fandom } from "./Fandom";
import { Story } from "./Story";

Fandom.sync();
Character.sync();
Story.sync();

export { Character, Fandom, Story };
