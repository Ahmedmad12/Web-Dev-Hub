function formatJSON() {
    try {
        let input = document.getElementById('jsonInput').value;
        let output = JSON.stringify(JSON.parse(input), null, 4);
        document.getElementById('jsonInput').value = output;
    } catch {
        alert("Invalid JSON ❌");
    }
}

function minifyHTML() {
    let input = document.getElementById('htmlInput').value;
    let output = input.replace(/\s+/g, ' ').trim();
    document.getElementById('htmlInput').value = output;
}

function encodeBase64() {
    let input = document.getElementById('baseInput').value;
    document.getElementById('baseInput').value = btoa(input);
}

function generateColor() {
    let color = "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6,'0');
    document.getElementById("colorBox").style.background = color;
    document.getElementById("colorCode").value = color;

    navigator.clipboard.writeText(color);
    let msg = document.getElementById("copyMessage");
    msg.style.display = "block";
    setTimeout(() => msg.style.display = "none", 1200);
}

function convertColor() {
    let val = document.getElementById("colorInput").value.trim();
    let output = "";
    if(val.startsWith("#")) {
        let c = val.substring(1);
        if(c.length === 3) c = c.split('').map(x=>x+x).join('');
        let r = parseInt(c.substring(0,2),16);
        let g = parseInt(c.substring(2,4),16);
        let b = parseInt(c.substring(4,6),16);
        output = `RGB(${r},${g},${b}) | HSL(${rgbToHsl(r,g,b)})`;
    } else if(val.startsWith("rgb")) {
        let nums = val.match(/\d+/g).map(Number);
        output = `#${nums.map(x=>x.toString(16).padStart(2,'0')).join('')}`;
    } else {
        output = "Unsupported format";
    }
    document.getElementById("colorOutput").value = output;
}

function rgbToHsl(r,g,b){
    r/=255; g/=255; b/=255;
    let max=Math.max(r,g,b), min=Math.min(r,g,b);
    let h,s,l=(max+min)/2;
    if(max===min){h=s=0;}
    else{
        let d=max-min;
        s=l>0.5?d/(2-max-min):d/(max+min);
        switch(max){
            case r: h=(g-b)/d+(g<b?6:0); break;
            case g: h=(b-r)/d+2; break;
            case b: h=(r-g)/d+4; break;
        }
        h=Math.round(h*60);
    }
    s=Math.round(s*100);
    l=Math.round(l*100);
    return `${h},${s}%,${l}%`;
}

function generateGradient() {
    let c1 = document.getElementById("grad1").value || "#6246ea";
    let c2 = document.getElementById("grad2").value || "#4ef18b";
    let box = document.getElementById("gradBox");
    box.style.background = `linear-gradient(45deg, ${c1}, ${c2})`;
}

function minifyCSS() {
    let input = document.getElementById("cssInput").value;
    let output = input.replace(/\s+/g,' ').replace(/;\s/g,';').trim();
    document.getElementById("cssInput").value = output;
}

function minifyJS() {
    let input = document.getElementById("jsInput").value;
    let output = input.replace(/\s+/g,' ').replace(/;\s/g,';').trim();
    document.getElementById("jsInput").value = output;
}
