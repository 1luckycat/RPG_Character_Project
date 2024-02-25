import { Race, Classes, WeaponType, Element } from './types';
import { Character, TaskManager, Weapon } from './TaskManager';

let charaForm = document.getElementById('charaForm') as HTMLFormElement;
console.log(charaForm)

const taskManager = new TaskManager()

charaForm.addEventListener("submit", (event) => {
    event.preventDefault();

    
    const charNameInput = document.getElementById('charaName') as HTMLInputElement;
    const raceInput = document.querySelectorAll('#raceRadio') as NodeListOf<HTMLInputElement>;
    const classesInput = document.querySelectorAll('#classRadio') as NodeListOf<HTMLInputElement>;
    const descriptionInput = document.getElementById('description') as HTMLInputElement;

    let raceRadio: Race = 'human'
    let classRadio: Classes = 'healer'

    raceInput.forEach(race => {
        if (race.checked){
            raceRadio = race.value as Race
        }
    })

    classesInput.forEach(classes => {
        if (classes.checked){
            classRadio = classes.value as Classes
        }
    })

    let charaName = charNameInput.value;
    let description = descriptionInput.value;

    console.log(charaName, raceRadio, classRadio, description);

    const newChara = new Character(charaName, raceRadio as Race, classRadio as Classes, description);

    taskManager.addCharacter(newChara)

    charaForm.reset();


})


let weaponForm = document.getElementById('weaponForm') as HTMLFormElement;

weaponForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const weaponNameInput = document.getElementById('weaponName') as HTMLInputElement;
    const weaponTypeInput = document.getElementById('weaponType') as HTMLInputElement;
    const elementInput = document.getElementById('weaponElement') as HTMLInputElement;
    const weapDescriptionInput = document.getElementById('weaponDescription') as HTMLInputElement;
    const characterId = document.getElementById('charaId') as HTMLInputElement;

    let weaponName = weaponNameInput.value;
    // console.log(1)   <--- if this event is not working when clicking button, can add console.logs to see which part is not working
    let weaponDescription = weapDescriptionInput.value;
    // console.log(2)
    let weaponType = weaponTypeInput.value;
    // console.log(3)
    let element = elementInput.value;
    // console.log(4)
    let charaId = characterId.value;

    console.log(weaponName, weaponDescription, weaponType, element);

    const addWeapon = new Weapon(weaponName, weaponType as WeaponType, element as Element, weaponDescription);

    taskManager.updateWeapon(addWeapon, charaId);

    weaponForm.reset();

})