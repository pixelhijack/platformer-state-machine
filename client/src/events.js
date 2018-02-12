export const bootEvents = {
    'BOOT:INIT': () => { console.log('[BOOT:INIT]'); }
};

export const menuEvents = {
    'MENU:INIT': () => { console.log('[MENU:INIT]'); }
};

export const gameEvents = {
    'GAME:INIT': (initConfig) => { console.log('[GAME:INIT]', initConfig); },
    'GAME:PRELOAD': () => { console.log('[GAME:PRELOAD]'); },
    'GAME:CREATE': () => { console.log('[GAME:CREATE]'); }
};
