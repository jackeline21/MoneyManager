//const mongoose = require("mongoose");
//const Purse = mongoose.model("Purse");

module.exports = {
    Categorias: (e, options) => {
        const ListaCategorias = [
            "Maquillaje",
            "Casa",
            "Comida",
            "Comunicación",
            "Deportes",
            "Entretenimiento",
            "Salón de belleza",
            "Spa",
            "Ropa",
            "Regalos",
            "Transporte",
            "Higiene",
            "Facturas",
            "Gym",
            "Deportes",
            "Mascotas",
            "Zapatos"
        ];

        let html = "";

        // Mostrar las categorías
        ListaCategorias.forEach(categoria => {
            
            html += `<option>${categoria}</option>`;
        }); 

        return (options.fn().html = html);
    },
    accountLister: (e, options) => {


        let html = "";

        // Mostrar las categorías
        e.account.forEach(acc => {
            
            html += `<option>${acc.name}</option>`;
        }); 

        return (options.fn().html = html);
    },
    tableMaker: (e, options) => {

        let html = ""

        let acc = [];
        let ing = [];
        let gast = [];

        console.log(e);
        

        e.income.forEach(inc => {
            if(!acc.includes(inc.account)){
                acc.push(inc.account);
            }
        })
        e.expense.forEach(exp => {
            if(!acc.includes(exp.account)){
                acc.push(exp.account);
            }
        })


        acc.forEach(function(ac, index){
            let suminc = 0;
            let sumexp = 0;
            e.income.forEach(inc => {
                if(ac == inc.account){
                    suminc += Number(inc.amount)
                }
            });
            e.expense.forEach(exp => {
                if(ac == exp.account){
                    sumexp += Number(exp.amount)
                }
            });
            ing.push(suminc);
            gast.push(sumexp);
        });

        console.log(acc);
        console.log(ing);
        console.log(gast);

        let counter = 0;
        
        acc.forEach(function(ac, index){
            counter += 1;

            html +=`<tr>
                    <td class="text-info"> ${counter} </td>
                    <td> ${ac}</td>
                    <td> ${ing[index]}</td>
                    <td> ${gast[index]} </td>
                    <td class="text-success"> ${ing[index] - gast[index]}</td>
                    </tr>  `

        });

        /* 
        <tr>
                <td> 1 </td>
                <td> Herman Beck </td>
                <td>
                  nada
                </td>
                <td> $ 77.99 </td>
              </tr>
        */
        

        return (options.fn().html = html);
    },
    cardMaker: (e, options) => {

        let html = ""

        let acc = [];
        let ing = [];
        let gast = [];

        console.log(e);
        

        e.income.forEach(inc => {
            if(!acc.includes(inc.account)){
                acc.push(inc.account);
            }
        })
        e.expense.forEach(exp => {
            if(!acc.includes(exp.account)){
                acc.push(exp.account);
            }
        })


        acc.forEach(function(ac, index){
            let suminc = 0;
            let sumexp = 0;
            e.income.forEach(inc => {
                if(ac == inc.account){
                    suminc += Number(inc.amount)
                }
            });
            e.expense.forEach(exp => {
                if(ac == exp.account){
                    sumexp += Number(exp.amount)
                }
            });
            ing.push(suminc);
            gast.push(sumexp);
        });

        console.log(acc);
        console.log(ing);
        console.log(gast);

        let counter = 0;
        
        acc.forEach(function(ac, index){
            counter += 1;

            html +=`<div class="col-md-4 stretch-card grid-margin">
                    <div class="card bg-gradient-info card-img-holder text-white">
                    <div class="card-body">
                    <img src="/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
                    <h4 class="font-weight-normal mb-3">${ac}<i class="mdi mdi-chart-line mdi-24px float-right"></i>
                    <h2 class="mb-5">L ${ing[index] - gast[index]}.00</h2>
                    </div>
                    </div>
                    </div> `

        });


        /* 
    
        */
        
        return (options.fn().html = html);
    }
    

}