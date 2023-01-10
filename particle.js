function init()
{
    clock=new THREE.Clock(true);
    scene=new THREE.Scene();
    
    light=new THREE.DirectionalLight("white");
    light.position.set(-1,1,1).normalize();
    scene.add(light);

    camera=new THREE.PerspectiveCamera(100,innerWidth/innerHeight,1,1000);
    camera.position.z=10;

    renderer=new THREE.WebGLRenderer();
    renderer.setSize(innerWidth,innerHeight);
    
    particleSystem=createParticles();
    scene.add(particleSystem);
    
    setTimeout(()=>
    {
        document.body.appendChild(renderer.domElement);
    },500);
    

    render();
}

function render()
{
    renderer.render(scene,camera);
}

function animate()
{
    deltaTime=clock.getDelta();
    render();
    animateParticles();
    requestAnimationFrame(animate);    
}

function createParticles()
{
    let particleCount=2000;

    let particles=new THREE.Geometry;

    for(let p=0;p<particleCount;p++)
    {
        var x = Math.random() * 400 - 200;
        var y = Math.random() * 400 - 200;
        var z = Math.random() * 400 - 200;

        particle=new THREE.Vector3(x,y,z);

        particles.vertices.push(particle);
    }

    let particleMaterial=new THREE.PointsMaterial({
        color:"white",
        size:1,
        map: THREE.ImageUtils.loadTexture("./goldparticle.png"),
        blending: THREE.AdditiveBlending,
        transparent: true,
        });

        particleSystem = new THREE.Points(particles, particleMaterial);
        return particleSystem;
}

function animateParticles()
{
    verts=particleSystem.geometry.vertices;

    for(let i=0;i<verts.length;i++)
    {
        var vert=verts[i];

        if(vert.y<-200)
        {
            vert.y = Math.random() * 400 - 200;
        }
    
        vert.y = vert.y - (10 * deltaTime);

    }

    particleSystem.geometry.verticesNeedUpdate = true;

    particleSystem.rotation.x += .1 * deltaTime ;

}

init();
animate();

window.onresize=()=>
{
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth,innerHeight);
    render();
}