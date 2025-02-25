mergeInto( LibraryManager.library,{
    SocketIOInit:function()
    {
        if (typeof io === 'undefined') {
            console.error('Socket.IO client library is not loaded.');
            return;
        }

        // var socket = io('http://localhost:5005/');
        var socket = io('https://starksweep-socket.starkarcade.com/');

        socket.on('connect', () => {
            socket.isReady = true;
            console.log('Socket.IO connected');
        });
        
        socket.on('updateBrushPosition', (data) => {
            if(this.updateBrushPositionMethodStr && this.updateBrushPositionObjectStr)
                SendMessage(this.updateBrushPositionObjectStr, this.updateBrushPositionMethodStr, data);
        });
        socket.on('spawnCoin', (bool) => {
            if(this.spawnCoinMethodStr && this.spawnCoinObjectStr)
                SendMessage(this.spawnCoinObjectStr, this.spawnCoinMethodStr, bool);
        });
        socket.on('updateCoin', (collectedCoin) => {
            if(this.updateCoinMethodStr && this.updateCoinObjectStr)
                SendMessage(this.updateCoinObjectStr, this.updateCoinMethodStr, collectedCoin);
        });
        socket.on('updateProof', (proof) => {
            if(this.updateProofMethodStr && this.updateProofObjectStr)
                SendMessage(this.updateProofObjectStr, this.updateProofMethodStr, proof);
        });
        socket.on('updateLevelCoin', (levelCoin) => {
            if(this.updateLevelCoinMethodStr && this.updateLevelCoinObjectStr)
                SendMessage(this.updateLevelCoinObjectStr, this.updateLevelCoinMethodStr, levelCoin);
        });
        socket.on('updateMainBrush', ()=> {
            if(this.updateMainBrushObjectStr, this.updateMainBrushMethodStr)
                SendMessage(this.updateMainBrushObjectStr, this.updateMainBrushMethodStr);
        });

        window.unitySocket = socket;
    },

    RegisterUpdate:function(updateObjectName, updateMethodName)
    {
        this.updateObjectStr = UTF8ToString(updateObjectName);
        this.updateMethodStr = UTF8ToString(updateMethodName);
    },
    RegisterUpdateBrushPosition:function(updateObjectName, updateMethodName)
    {
        this.updateBrushPositionObjectStr = UTF8ToString(updateObjectName);
        this.updateBrushPositionMethodStr = UTF8ToString(updateMethodName);
    },
    RegisterSpawnCoin:function(updateObjectName, updateMethodName)
    {
        this.spawnCoinObjectStr = UTF8ToString(updateObjectName);
        this.spawnCoinMethodStr = UTF8ToString(updateMethodName);
    },
    RegisterUpdateCoin:function(updateObjectName, updateMethodName)
    {
        this.updateCoinObjectStr= UTF8ToString(updateObjectName);
        this.updateCoinMethodStr = UTF8ToString(updateMethodName);
    },
    RegisterUpdateProof:function(updateObjectName, updateMethodName)
    {
        this.updateProofObjectStr = UTF8ToString(updateObjectName);
        this.updateProofMethodStr = UTF8ToString(updateMethodName);
    },
    RegisterUpdateLevelCoin:function(updateObjectName, updateMethodName)
    {
        this.updateLevelCoinObjectStr= UTF8ToString(updateObjectName);
        this.updateLevelCoinMethodStr= UTF8ToString(updateMethodName);
    },
    RegisterUpdateMainBrush:function(updateObjectName, updateMethodName)
    {
        this.updateMainBrushObjectStr = UTF8ToString(updateObjectName);
        this.updateMainBrushMethodStr = UTF8ToString(updateMethodName);
    },


    EmitUpdate:function()
    {
        if(window.unitySocket)
            window.unitySocket.emit('update');
    },
    EmitUpdateBrushPosition:function(x1, y1, x2, y2)
    {
        if(window.unitySocket)    
        {
            window.unitySocket.emit('setBrushPosition', UTF8ToString(x1), UTF8ToString(y1), UTF8ToString(x2), UTF8ToString(y2));
        }
    },
    EmitPlayerTouch:function()
    {
        if(window.unitySocket)    
            window.unitySocket.emit('playerTouch');
    },
    EmitCoinCollect:function(posX, posY)
    {
        if(window.unitySocket)    
            window.unitySocket.emit('coinCollect', UTF8ToString(posX), UTF8ToString(posY));
    },
    EmitUpdatePlatformPos:function(posX, posY)
    {
        if(window.unitySocket)    
            window.unitySocket.emit('updatePlatformPosition', UTF8ToString(posX), UTF8ToString(posY));
    },
    EmitUpdateLevel:function(level)
    {
        if(window.unitySocket)    
            window.unitySocket.emit('updateLevel', UTF8ToString(level));
    },
    EmitCoinCollect:function(posX, posY)
    {
        if(window.unitySocket)    
            window.unitySocket.emit('coinCollect', UTF8ToString(posX), UTF8ToString(posY));
    },
    EmitClaim:function(accountAddress)
    {
        if(window.unitySocket)    
            window.unitySocket.emit('claim', UTF8ToString(accountAddress));
    },
    EmitAfterClaim:function()
    {
        if(window.unitySocket)
            window.unitySocket.emit('afterClaim');
    },
    

    FreeWasmString: function(ptr) {
        _free(ptr);
    }
});