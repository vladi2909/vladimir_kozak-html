class HomeSettingsBuilder {
    addBasement(basement) {
        this._basement = basement;
        return this;
    }

    addFloor(floor) {
        this._floor = floor;
        return this;
    }

    addSection(section) {
        this._section = section;
        return this;
    }

    addRoof(roof) {
        this._roof = roof;
        return this;
    }

    addWindow(window) {
        this._window = window;
        return this;
    }

    addDoor(door) {
        this._door = door;
        return this;
    }

    build() {
        if (!this._basement) {
            throw new Error("Please set basement");
        }

        if (!this._floor) {
            throw new Error("Please set floor");
        }

        if (!this._section) {
            throw new Error("Please set section");
        }

        if (!this._roof) {
            throw new Error("Please set roof");
        }

        if (!this._window) {
            throw new Error("Please set window");
        }

        if (!this._door) {
            throw new Error("Please set door");
        }

        return new HomeSettings({
            basement: this._basement,
            floor: this._floor,
            section: this._section,
            roof: this._roof,
            window: this._window,
            door: this._door
        });
    }
}

class HomeSettings {
    constructor(settings) {
        this._basement = settings.basement;
        this._floor = settings.floor;
        this._section = settings.section;
        this._roof = settings.roof;
        this._window = settings.window;
        this._door = settings.door;
    }

    get basement() {
        return this._basement;
    }

    get floor() {
        return this._floor;
    }

    get section() {
        return this._section;
    }

    get roof() {
        return this._roof;
    }

    get window() {
        return this._window;
    }

    get door() {
        return this._door;
    }

    static getBuilder() {
        return new HomeSettingsBuilder();
    }
}

module.exports = HomeSettings;