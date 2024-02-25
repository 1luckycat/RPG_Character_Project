import {v4 as uuidv4} from 'uuid';

import { Race, Classes, Managing, WeaponType, Element } from './types';

export class Character {
    private _id: string;
    public weaponArray: Weapon[] = [];

    constructor (
        public name: string,
        public race: Race,
        public classes: Classes,
        public description?: string
    ) {
        this._id = uuidv4();
    }

    get id(): string {
        return this._id
    }


    public showWeapons = () => {
        return this.weaponArray.map( weapon => {         // .map is similar to forEach
            return `
                <div class="card rounded" id="show">
                    <div class="card-body">
                        <h5 class="card-title">Weapon Name: ${weapon.weapName}</h5>
                        <p class="card-text">Weapon Type: ${weapon.weaponType}</p>
                        <p class="card-text">Weapon Element: ${weapon.element}</p>
                        <p class="card-text">Weapon Description: ${weapon.weapDescription}</p>
                        <button type='submit' class="btn btn-danger btn-sm" id="rmWeaponBtn" data-weapon="${weapon.weaponId}">Remove Weapon</button>
                    </div>
                </div>
            `
    })}

}

export class Weapon{
    
    readonly weaponId: string;
    weapName: string;
    weaponType: string;
    element: string;
    weapDescription?: string;

    constructor(
        weapName: string, 
        weaponType: WeaponType, 
        element: Element,
        weapDescription?: string 
    ) {
        this.weaponId = uuidv4();   
        this.weapName = weapName;
        this.weaponType = weaponType;
        this.element = element;
        this.weapDescription = weapDescription    
    }

    get weaponsId(): string {
        return this.weaponId
    }
}


export class TaskManager implements Managing<Character | string | Weapon> {
    public characters: Character[] = [];
    public weaponArray: Weapon[] = [];

    public addCharacter(chara: Character): void{
        this.characters.push(chara);

        this.updateCharaList();
    }

    public removeCharacter(charaId: string):void {
        const index = this.characters.findIndex((chara) => chara.id === charaId)

        if (index !== -1){
            this.characters.splice(index, 1)
        }

        this.updateCharaList();
    }


    private updateCharaList(){
        const container = document.getElementById('character') as HTMLElement;

        container.innerHTML = "";

        this.characters.forEach( chara => {
            const charaCard = `
                <div class="card mb-3 rounded">
                    <div class="card-body">
                        <h5 class="card-title">Name: ${chara.name}</h5>
                        <p class="card-text">Character ID: ${chara.id}</p>
                        <p class="card-text">Race: ${chara.race}</p>
                        <p class="card-text">Class: ${chara.classes}</p>
                        <p class="card-text">Description: ${chara.description}</p>
                        <p class="card-text">Weapons: ${chara.showWeapons()}</p>
                        <button type='submit' class="btn btn-danger btn-sm" data-task="${chara.id}">Remove Character</button>
                    </div>
                </div>
            
            `
            // in Weapons: can add a method to display each weapon ^ or write another for loop inside there
            
            container.insertAdjacentHTML('beforeend', charaCard)

        });

        let allCharRemove = container.querySelectorAll('.btn-danger')
        
        allCharRemove.forEach( button => {
            button.addEventListener('click', () => {
                const charaId = button.getAttribute('data-task');
                if (charaId) {
                    this.removeCharacter(charaId);
                }
            })
        })


        let allWeaponRemove = container.querySelectorAll('.btn-danger')
        
        allWeaponRemove.forEach( button => {
            button.addEventListener('click', () => {
                const weapId = button.getAttribute('data-weapon');
                if (weapId) {
                    this.removeWeapon(weapId);
                }
            })
        })

    }


    public updateWeapon(weapon: Weapon, charaId: string):void {
        for (let character of this.characters) {
            if (character.id === charaId) {
                character.weaponArray.push(weapon);
            }
        }

        this.updateCharaList();
    }


    public removeWeapon(weapId: string):void {
        const index1 = this.weaponArray.findIndex((weapon) => weapon.weaponId === weapId)
        console.log(index1)

        if (index1 !== -1){
            this.weaponArray.splice(index1, 1)
        }

        this.updateCharaList();
    }


}