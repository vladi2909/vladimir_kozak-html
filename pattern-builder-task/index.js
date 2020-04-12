const HomeSettings = require('./home-settings');

const home = HomeSettings.getBuilder()
    .addBasement(true) 
    .addFloor(3)
    .addSection(2)
    .addRoof('gable')
    .addWindow(12)
    .addDoor(9)
    .build();

console.log(home);