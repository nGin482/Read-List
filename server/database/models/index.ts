import { Character } from "./Character";
import { Collection } from "./CollectionModel";
import { CollectionStories } from "./CollectionStories";
import { Fandom } from "./Fandom";
import { Story } from "./Story";

Fandom.sync();
Character.sync();
Story.sync();
Collection.sync();
CollectionStories.sync();

export { Character, Collection, CollectionStories, Fandom, Story };
