function convertirUnidadAMayor(cantidad, unidad) {
    switch (unidad) {
        case 'unidad':
            return cantidad; // 保持为单位
        case 'ml':
            return cantidad / 1000; // 将毫升转换为升
        case 'litros':
            return cantidad; // 保持为升
        case 'gramas':
            return cantidad / 1000; // 将克转换为千克
        case 'quilos':
            return cantidad; // 保持为千克
        case 'centimetros':
            return cantidad / 100; // 将厘米转换为米
        case 'metros':
            return cantidad; // 保持为米
        default:
            return 0; // 无效情况
    }
  }
  
  function obtenerUnidadMayor(unidad) {
    switch (unidad) {
        case 'unidad':
            return '单位';
        case 'ml':
        case 'litros':
            return '升';
        case 'gramas':
        case 'quilos':
            return '千克';
        case 'centimetros':
        case 'metros':
            return '米';
        default:
            return '';
    }
  }
  
  function calcularCostoPorUnidad(precio, cantidad) {
    if (cantidad === 0) {
        return 0;
    }
    return precio / cantidad;
  }
  
  function actualizarUnidades(id) {
    const unidad1 = document.getElementById('unidad1').value;
    const unidad2 = document.getElementById('unidad2').value;
    
    if (id === 'unidad1' && unidad1 === 'unidad') {
        document.getElementById('unidad2').value = 'unidad';
        document.getElementById('unidad2').disabled = true;
    } else if (id === 'unidad2' && unidad2 === 'unidad') {
        document.getElementById('unidad1').value = 'unidad';
        document.getElementById('unidad1').disabled = true;
    } else {
        document.getElementById('unidad1').disabled = false;
        document.getElementById('unidad2').disabled = false;
    }
  }
  
  function compararPrecios() {
    let cantidad1 = parseFloat(document.getElementById('cantidad1').value);
    let unidad1 = document.getElementById('unidad1').value;
    let precio1 = parseFloat(document.getElementById('precio1').value);
    
    let cantidad2 = parseFloat(document.getElementById('cantidad2').value);
    let unidad2 = document.getElementById('unidad2').value;
    let precio2 = parseFloat(document.getElementById('precio2').value);
    
    if (isNaN(cantidad1) || isNaN(precio1) || isNaN(cantidad2) || isNaN(precio2)) {
        document.getElementById('mensaje').innerText = "请输入必填数据。";
        return;
    }
    
    if (unidad1 === '' || unidad2 === '') {
        document.getElementById('mensaje').innerText = "请选择两个产品的测量单位。";
        return;
    }
    
    if (unidad1 === 'unidad') {
        document.getElementById('unidad2').value = 'unidad';
        document.getElementById('unidad2').disabled = true;
    }
    
    let unidadMayor1 = obtenerUnidadMayor(unidad1);
    let unidadMayor2 = obtenerUnidadMayor(unidad2);
  
    let cantidadConvertida1 = convertirUnidadAMayor(cantidad1, unidad1);
    let cantidadConvertida2 = convertirUnidadAMayor(cantidad2, unidad2);
    
    let costoPorUnidad1 = calcularCostoPorUnidad(precio1, cantidadConvertida1);
    let costoPorUnidad2 = calcularCostoPorUnidad(precio2, cantidadConvertida2);
    
    let producto1 = document.getElementById('producto1');
    let producto2 = document.getElementById('producto2');
    
    document.getElementById('costo1').innerText = `每${unidadMayor1}成本: $${costoPorUnidad1.toFixed(2)}`;
    document.getElementById('costo2').innerText = `每${unidadMayor2}成本: $${costoPorUnidad2.toFixed(2)}`;
    
    if (costoPorUnidad1 < costoPorUnidad2) {
        producto1.classList.add('verde');
        producto1.classList.remove('rojo');
        producto2.classList.add('rojo');
        producto2.classList.remove('verde');
        document.getElementById('costo1').innerText += " - 这个更划算！🤑";
    } else {
        producto1.classList.add('rojo');
        producto1.classList.remove('verde');
        producto2.classList.add('verde');
        producto2.classList.remove('rojo');
        document.getElementById('costo2').innerText += " - 这个更划算！🤑";
    }
    
    document.getElementById('mensaje').innerText = "";
  }
  
  function limpiarCampos() {
    document.getElementById('cantidad1').value = '';
    document.getElementById('unidad1').value = '';
    document.getElementById('precio1').value = '';
    document.getElementById('cantidad2').value = '';
    document.getElementById('unidad2').value = '';
    document.getElementById('precio2').value = '';
    document.getElementById('costo1').innerText = '';
    document.getElementById('costo2').innerText = '';
    document.getElementById('mensaje').innerText = '';
    
    let producto1 = document.getElementById('producto1');
    let producto2 = document.getElementById('producto2');
    
    producto1.classList.remove('verde', 'rojo');
    producto2.classList.remove('verde', 'rojo');
  
    document.getElementById('unidad1').disabled = false;
    document.getElementById('unidad2').disabled = false;
  }
  