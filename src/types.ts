type Race = 'human' | 'ogre' | 'elf' | 'dwarf' | 'beastfolk'

type Classes = 'warrior' | 'mage' | 'archer' | 'thief' | 'healer'

type WeaponType = 'sword' | 'axe' | 'spear' | 'bowandarrows' | 'staff' | 'dagger'

type Element = 'normal' | 'fire' | 'water' | 'air' | 'earth' | 'electricity'

interface Managing<T> {
    addCharacter(param: T):void
    removeCharacter(param: T):void
}

export {
    Race,
    Classes,
    Managing,
    WeaponType,
    Element
}

