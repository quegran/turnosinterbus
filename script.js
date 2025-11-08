class InterbusTurnosApp {
    constructor() {
        this.currentScreen = 'input';
        this.inputValue = '';
        this.lastTriedNumber = '';
        this.maxDigits = 3;
        
        // Lista de imágenes disponibles (copiada del código Flutter)
        this.availableImages = [
            'n1100', 'n1547', 'n1883', 'n1888', 'n203', 'n202', 'n205', 'n208', 'n209', 'n210',
            'n212', 'n213', 'n214', 'n215', 'n218', 'n219', 'n220', 'n221', 'n222', 'n223',
            'n225', 'n226', 'n229', 'n230', 'n232', 'n234', 'n235', 'n238', 'n241', 'n242',
            'n243', 'n244', 'n246', 'n247', 'n248', 'n249', 'n260', 'n263', 'n265', 'n268',
            'n270', 'n301', 'n302', 'n303', 'n304', 'n305', 'n306', 'n307', 'n308', 'n309',
            'n310', 'n311', 'n312', 'n313', 'n314', 'n316', 'n317', 'n320', 'n322', 'n323',
            'n324', 'n325', 'n326', 'n327', 'n328', 'n329', 'n330', 'n331', 'n333', 'n401',
            'n402', 'n403', 'n405', 'n406', 'n407', 'n408', 'n409', 'n410', 'n412', 'n413',
            'n414', 'n415', 'n418', 'n419', 'n420', 'n421', 'n422', 'n423', 'n425', 'n426',
            'n427', 'n429', 'n430', 'n431', 'n432', 'n434', 'n435', 'n438', 'n441', 'n442',
            'n443', 'n444', 'n445', 'n446', 'n447', 'n448', 'n449', 'n460', 'n474', 'n475',
            'n476', 'n477', 'n482', 'n483', 'n484', 'n485', 'n501', 'n502', 'n503', 'n505',
            'n506', 'n507', 'n510', 'n511', 'n512', 'n513', 'n514', 'n516', 'n517', 'n518',
            'n520', 'n521', 'n522', 'n523', 'n524', 'n526', 'n527', 'n530', 'n531', 'n532',
            'n533', 'n534', 'n535', 'n536', 'n537', 'n538', 'n539', 'n540', 'n542', 'n544',
            'n545', 'n546', 'n547', 'n548', 'n549', 'n550', 'n601', 'n602', 'n603', 'n604',
            'n605', 'n606', 'n609', 'n610', 'n611', 'n612', 'n613', 'n614', 'n615', 'n616',
            'n617', 'n619', 'n620', 'n625', 'n626', 'n627', 'n631', 'n632', 'n633', 'n634',
            'n635', 'n636', 'n637', 'n638', 'n639', 'n640', 'n641', 'n642', 'n643', 'n644',
            'n645', 'n646', 'n647', 'n648', 'n649', 'n650', 'n653', 'n655', 'n656', 'n657',
            'n658', 'n659', 'n660', 'n661', 'n663', 'n664', 'n665', 'n666', 'n668', 'n676',
            'n677', 'n678', 'n679', 'n680', 'n681', 'n682', 'n683', 'n684', 'n685', 'n686',
            'n687', 'n688', 'n689', 'n690', 'n691', 'n692', 'n693', 'n694', 'n695', 'n696',
            'n698', 'n699', 'n701', 'n702', 'n703', 'n704', 'n705', 'n706', 'n707', 'n711',
            'n712', 'n713', 'n714', 'n715', 'n716', 'n719', 'n720', 'n725', 'n726', 'n727',
            'n731', 'n732', 'n733', 'n734', 'n735', 'n736', 'n737', 'n739', 'n740', 'n741',
            'n742', 'n743', 'n744', 'n745', 'n746', 'n747', 'n748', 'n749', 'n750', 'n753',
            'n755', 'n756', 'n757', 'n758', 'n759', 'n760', 'n763', 'n764', 'n765', 'n766',
            'n774', 'n778', 'n779', 'n780', 'n782', 'n783', 'n784', 'n785', 'n786', 'n787',
            'n788', 'n789', 'n792', 'n793', 'n794', 'n795', 'n796', 'n798', 'n799', 'n801',
            'n802', 'n803', 'n804', 'n805', 'n806', 'n807', 'n808', 'n809', 'n810', 'n813',
            'n814', 'n815', 'n816', 'n817', 'n851', 'n852', 'n854', 'n855', 'n871', 'n872',
            'n873', 'n874', 'n875', 'n881', 'n882', 'n884', 'n885', 'n886', 'n887', 'n889',
            'n891'
        ];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updatePinInputsState();
    }
    
    setupEventListeners() {
        // Event listeners para los campos PIN
        const pinInputs = document.querySelectorAll('.pin-digit');
        pinInputs.forEach((input, index) => {
            input.addEventListener('input', (e) => this.onDigitInput(e, index));
            input.addEventListener('keydown', (e) => this.onKeyDown(e, index));
            input.addEventListener('paste', (e) => this.onPaste(e));
        });
        
        // Event listeners para las pantallas (click para volver)
        document.getElementById('image-screen').addEventListener('click', () => this.clearAll());
        document.getElementById('error-screen').addEventListener('click', () => this.clearAll());
        
        // Event listener para el botón atrás del navegador
        window.addEventListener('popstate', () => this.handleBackButton());
        
        // Event listener para teclado físico
        document.addEventListener('keydown', (e) => this.onGlobalKeyDown(e));
    }
    
    onDigitInput(event, index) {
        const value = event.target.value;
        const digit = value.replace(/[^0-9]/g, '').slice(-1);
        
        if (digit !== value) {
            event.target.value = digit;
        }
        
        // Actualizar valor total
        this.updateInputValue();
        
        // Determinar máximo de dígitos según primera cifra
        this.maxDigits = document.querySelector('.pin-digit').value === '1' ? 4 : 3;
        this.updatePinInputsState();
        
        // Si se ingresó un dígito y no es el último campo habilitado, pasar al siguiente
        if (digit && index < 3 && this.inputValue.length < this.maxDigits) {
            const nextInput = document.querySelector(`[data-index="${index + 1}"]`);
            if (nextInput && !nextInput.disabled) {
                nextInput.focus();
            }
        }
        
        // Si se alcanzó la longitud máxima, buscar imagen
        if (this.inputValue.length >= this.maxDigits) {
            this.tryShowImage();
        }
    }
    
    onKeyDown(event, index) {
        // Manejar backspace
        if (event.key === 'Backspace' && event.target.value === '' && index > 0) {
            const prevInput = document.querySelector(`[data-index="${index - 1}"]`);
            if (prevInput && !prevInput.disabled) {
                prevInput.value = '';
                prevInput.focus();
                this.updateInputValue();
                this.updatePinInputsState();
            }
        }
        
        // Manejar Enter
        if (event.key === 'Enter') {
            if (this.inputValue.length >= this.maxDigits) {
                this.tryShowImage();
            }
        }
    }
    
    onPaste(event) {
        event.preventDefault();
        const pastedText = (event.clipboardData || window.clipboardData).getData('text');
        const digits = pastedText.replace(/[^0-9]/g, '').slice(0, 4);
        
        // Limpiar todos los campos
        document.querySelectorAll('.pin-digit').forEach(input => {
            input.value = '';
        });
        
        // Llenar con los dígitos pegados
        for (let i = 0; i < digits.length; i++) {
            const input = document.querySelector(`[data-index="${i}"]`);
            if (input && !input.disabled) {
                input.value = digits[i];
            }
        }
        
        this.updateInputValue();
        this.updatePinInputsState();
        
        if (this.inputValue.length >= this.maxDigits) {
            this.tryShowImage();
        }
    }
    
    onGlobalKeyDown(event) {
        // Si estamos en pantalla de imagen o error, cualquier tecla vuelve al inicio
        if (this.currentScreen !== 'input') {
            this.clearAll();
            return;
        }
        
        // Si presionamos una tecla numérica, enfocar el primer campo vacío
        if (/^[0-9]$/.test(event.key)) {
            const emptyInput = Array.from(document.querySelectorAll('.pin-digit'))
                .find(input => !input.disabled && !input.value);
            if (emptyInput) {
                emptyInput.focus();
                emptyInput.value = event.key;
                this.updateInputValue();
                this.updatePinInputsState();
                
                if (this.inputValue.length >= this.maxDigits) {
                    this.tryShowImage();
                }
            }
        }
    }
    
    updateInputValue() {
        const values = Array.from(document.querySelectorAll('.pin-digit'))
            .map(input => input.value)
            .join('');
        this.inputValue = values;
    }
    
    updatePinInputsState() {
        const pinInputs = document.querySelectorAll('.pin-digit');
        pinInputs.forEach((input, index) => {
            const isEnabled = index < this.maxDigits;
            input.disabled = !isEnabled;
            
            if (isEnabled) {
                input.classList.add('enabled');
            } else {
                input.classList.remove('enabled');
            }
        });
    }
    
    isValidImagePath(imageName) {
        return this.availableImages.includes(imageName);
    }
    
    tryShowImage(value = null) {
        const currentValue = value || this.inputValue;
        const trimmed = currentValue.trim();
        
        if (trimmed === '') {
            this.showError('Introduce un número');
            return;
        }
        
        this.lastTriedNumber = trimmed;
        
        // Buscar imagen con diferentes formatos
        const candidateNames = [`n${trimmed}`, `img_${trimmed}`, `num_${trimmed}`];
        let foundImageName = null;
        
        for (const name of candidateNames) {
            if (this.isValidImagePath(name)) {
                foundImageName = name;
                break;
            }
        }
        
        if (foundImageName) {
            this.showImage(foundImageName);
        } else {
            this.showError(`El turno ${trimmed} no existe`);
        }
    }
    
    showImage(imageName) {
        const imageElement = document.getElementById('turno-image');
        imageElement.src = `assets/images/${imageName}.jpg`;
        imageElement.onerror = () => {
            this.showError(`El turno ${this.lastTriedNumber} no existe`);
        };
        
        this.switchScreen('image');
    }
    
    showError(message) {
        document.getElementById('error-message').textContent = message;
        this.switchScreen('error');
    }
    
    switchScreen(screenName) {
        // Ocultar todas las pantallas
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Mostrar la pantalla seleccionada
        document.getElementById(`${screenName}-screen`).classList.add('active');
        this.currentScreen = screenName;
        
        // Actualizar historial del navegador
        history.pushState({ screen: screenName }, '', `#${screenName}`);
    }
    
    clearAll() {
        // Limpiar inputs
        document.querySelectorAll('.pin-digit').forEach(input => {
            input.value = '';
        });
        
        this.inputValue = '';
        this.lastTriedNumber = '';
        this.maxDigits = 3;
        this.updatePinInputsState();
        
        // Volver a pantalla de entrada
        this.switchScreen('input');
        
        // Enfocar el primer campo
        setTimeout(() => {
            document.querySelector('.pin-digit').focus();
        }, 100);
    }
    
    handleBackButton() {
        if (this.currentScreen !== 'input') {
            this.clearAll();
        }
    }
}

// Inicializar la aplicación cuando se carga el DOM
document.addEventListener('DOMContentLoaded', () => {
    new InterbusTurnosApp();
});

// Manejar el estado inicial de la URL
window.addEventListener('load', () => {
    const hash = window.location.hash.slice(1);
    if (hash && ['input', 'image', 'error'].includes(hash)) {
        // Si hay un hash válido, mantenerlo
        return;
    } else {
        // Si no hay hash o es inválido, ir a input
        window.location.hash = 'input';
    }
});

