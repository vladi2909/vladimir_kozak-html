class HomeSettingsBuilder {
    addBasement(basement) {
        this._basement = basement;

        let bas = `
        ████████████████████████████████
        ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░██
        ██░░░░██████████░░░░░░░░░░░░░░██
        ██░░░░██░░░░░░██░░░░░░░░░░░░░░██
        ██░░░░████░░░░██░░░░░░░░░░░░░░██
        ██░░░░██░░░░░░██░░░░░░░░░░░░░░██
        ██░░░░██░░░░░░██░░░░░░░░░░░░░░██
        ████████████████████████████████`;

        console.log(bas);

        return this;
    }

    addFloor(floor) {
        this._floor = floor;
        let str = '';
        let floor_img =  `
        ████████████████████████████████
        ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░██
        ██░░░░██████░░░░░░░░██████░░░░██
        ██░░░░██████░░░░░░░░██████░░░░██
        ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░██
        ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░██
        ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░██
        ████████████████████████████████`; 

        for(let i = 0; i < floor; i++) {
                str += floor_img;
            }

        console.log(str);

        return this;
    }

    addRoof(roof) {
        this._roof = roof;

        let roof_img = `
                      ████
                ████████████████
              ████████████████████
            ████████████████████████
          ████████████████████████████
        ████████████████████████████████`;
    
        console.log(roof_img);

        return this;
    }

    build() {
        if (!this._basement) {
            throw new Error("Please set basement");
        }

        if (!this._floor) {
            throw new Error("Please set floor");
        }

        if (!this._roof) {
            throw new Error("Please set roof");
        }

        return new HomeSettings({
            basement: this._basement,
            floor: this._floor,
            roof: this._roof,
        });
    }
}

class HomeSettings {
    constructor(settings) {
        this._basement = settings.basement;
        this._floor = settings.floor;
        this._roof = settings.roof;
    }

    get basement() {
        return this._basement;
    }

    get floor() {
        return this._floor;
    }

    get roof() {
        return this._roof;
    }

    static getBuilder() {
        return new HomeSettingsBuilder();
    }
}

module.exports = HomeSettings;