$(document).ready(function(){
    /*=================== TEXT on MAP =======================*/
    $('#map_city').keyup(function() {
        $('.city').text(this.value);        
    });
    $('#map_city').change(function(){
        $('.city').text(this.value);
    });
    $('#map_country').keyup(function() {
        $('.country span').text(this.value);
    });
    $('#map_country').change(function(){
        $('.country span').text(this.value);
    });
    $('#map_subtitle').keyup(function() {
        $('.subtitle').text(this.value);
    });
    $('#map_subtitle').change(function(){
        $('.subtitle').text(this.value);
    });

    /*===================== MAP INIT =========================*/
    mapInit('mono');
    
    function mapInit(style){
        const mapMinZoom = 3;
        const mapMaxZoom = 20;

        var map = L.map('map', {
            maxZoom: mapMaxZoom,
            minZoom: mapMinZoom
        });
        
        var layer = 'https://tiles.mapiful.com/'+style+'/{z}/{x}/{y}.png';
        
        L.tileLayer(layer, {
            minZoom: mapMinZoom,
            maxZoom: mapMaxZoom
        }).addTo( map );

        map.setView([0, 0], 0);
    }

    
    $('#asphalt').on('click', function(){
        
        console.log('asphalt');
    })
    
})

