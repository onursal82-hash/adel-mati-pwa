/**
 * Main Entry Point
 */
import { GameController } from './game/GameController.js';

// Clear Electron cache on startup
if (typeof window !== 'undefined' && window.electron) {
    try {
        if ('caches' in window) {
            caches.keys().then((names) => {
                names.forEach((name) => {
                    caches.delete(name);
                });
            });
        }
    }
    catch (e) {
        // Cache clearing not available
    }
}

// Force clear any existing styles that might hide elements
function forceClearStyles() {
    const style = document.createElement('style');
    style.textContent = `
    body > * {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
    }
    .login-screen,
    .game-screen,
    .stage-completion-screen,
    .final-celebration-screen {
      display: flex !important;
      visibility: visible !important;
      opacity: 1 !important;
    }
  `;
    document.head.appendChild(style);
}

// Initialize game when DOM is ready
async function initializeGame() {
    console.log('🚀 Starting game initialization...');
    forceClearStyles();
    
    // Hide loading indicator immediately
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
        loadingIndicator.remove(); // Remove from DOM completely
    }
    
    setTimeout(async () => {
        // Ensure body and root are visible
        const root = document.getElementById('root');
        if (!root) {
            console.error('❌ Root container NOT FOUND!');
            const errorMsg = document.getElementById('error-message');
            if (errorMsg) {
                errorMsg.textContent = 'ERROR: Root element (#root) not found in DOM!';
                errorMsg.style.display = 'block';
            }
            return;
        }
        
        console.log('✓ Root element found');
        
        // Set root styles
        root.style.display = 'flex';
        root.style.visibility = 'visible';
        root.style.opacity = '1';
        root.style.position = 'fixed';
        root.style.top = '0';
        root.style.left = '0';
        root.style.width = '100vw';
        root.style.height = '100vh';
        root.style.zIndex = '1';
        
        // Force body children to be visible
        Array.from(document.body.children).forEach((child) => {
            if (child.id !== 'error-message' && child.id !== 'loading-indicator') {
                const el = child;
                el.style.display = 'block';
                el.style.visibility = 'visible';
                el.style.opacity = '1';
            }
        });
        
        try {
            // Dynamic import for better compatibility
            let GameControllerClass = GameController;
            
            if (!GameControllerClass) {
                console.warn('⚠️ GameController not found in scope, trying dynamic import...');
                try {
                    const module = await import('./game/GameController.js');
                    GameControllerClass = module.GameController;
                } catch (importError) {
                    console.error('❌ Dynamic import failed:', importError);
                    throw new Error('Failed to import GameController: ' + importError.message);
                }
            }
            
            if (!GameControllerClass) {
                throw new Error('GameController is undefined! Import may have failed.');
            }
            
            console.log('✓ GameController loaded, creating instance...');
            const gameController = new GameControllerClass();
            window.gameController = gameController;
            console.log('✓ Game initialized successfully!');
            
            // Ensure loading indicator is hidden
            const loadingIndicator = document.getElementById('loading-indicator');
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
                loadingIndicator.remove();
            }
            
            // Check if root has content after 1 second
            setTimeout(() => {
                if (!root || root.children.length === 0) {
                    console.warn('⚠️ Root is still empty after initialization');
                    console.log('Root children count:', root ? root.children.length : 0);
                } else {
                    console.log('✓ Root has content:', root.children.length, 'children');
                }
            }, 1000);
        }
        catch (error) {
            console.error('❌ ERROR INITIALIZING GAME CONTROLLER:', error);
            console.error('Error stack:', error.stack);
            const errorMsg = document.getElementById('error-message');
            if (errorMsg) {
                errorMsg.textContent = `ERROR: Failed to initialize game:\n\n${error.message}\n\nCheck console for details.`;
                errorMsg.style.display = 'block';
            } else {
                alert(`ERROR: Failed to initialize game controller:\n\n${error}\n\nCheck console for details.`);
            }
        }
    }, 500);
}

// Try multiple initialization methods
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeGame);
}
else {
    initializeGame();
}

// Register Service Worker for PWA (skip on Android/iOS native apps)
if ('serviceWorker' in navigator && !window.Capacitor) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js').catch(() => {});
    });
}
//# sourceMappingURL=index.js.map
