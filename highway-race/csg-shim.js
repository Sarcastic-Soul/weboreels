(function () {
    if (typeof window.CSG !== 'undefined') return;
    if (typeof window.ThreeBSP === 'undefined') return;

    window.CSG = {
        fromMesh: function (mesh) {
            return new ThreeBSP(mesh);
        },
        toMesh: function (bsp, matrix) {
            if (!bsp) return null;
            if (matrix) {
                try {
                    bsp.matrix = matrix.clone ? matrix.clone() : matrix;
                } catch (e) {
                    console.warn('CSG.toMesh: could not set matrix', e);
                }
            }
            return bsp.toMesh(new THREE.MeshBasicMaterial({ color: 0xffffff }));
        }
    };
})();
