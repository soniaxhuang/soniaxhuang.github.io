let url = "https://raw.githubusercontent.com/soniaxhuang/FileStorage/main/apple1.json";

fetch(url)
.then(response => response.json())
.then(result => {
    let productSelected;
    let clickediPhone = result.iPhone;
    let clickediPad = result.iPad;
    
    //variable to clear radio-btn 
    let modelRem = document.querySelector('.model-rem');
    let finishes = document.querySelector('.finish');
    let capacity = document.querySelector('.capacity');
    let picDiv = document.querySelector('.product-pic');

    let prName = document.getElementById('pr-name');
    let prPrice = document.getElementById('pr-price');
    let bodyPrName = document.querySelector('.product-description span');
    let productPrice = document.querySelector('.product-price');
    let checkoutPrice = document.querySelector('.checkout-price');
    let checkoutBtnText = document.getElementById('checkoutBtn');
    let bckGround = document.getElementById('checkout-bck');

    productSelected = clickediPhone;
    createPage();

    //select product data
    let iphone = document.getElementById('iphoneNav');
    iphone.addEventListener('click', () => {
        productSelected = clickediPhone;
        createPage();
        productPrice.innerText = `NT$${Object.values(productSelected)[0].startingPrice} 起`
    })
    let ipad = document.getElementById('ipadNav');
    ipad.addEventListener('click', () => {
        productSelected = clickediPad;
        createPage();
        productPrice.innerText = `NT$${Object.values(productSelected)[0].startingPrice} 起`;
    })

    function createPage(){
        modelRem.innerHTML = "";
        finishes.innerHTML = "";
        capacity.innerHTML = "";
        picDiv.innerHTML = "";
        checkoutBtnText.innerText = "繼續";
        checkoutPrice.innerText = "";
        bckGround.classList.add('disabled');

        //change header & product name
        let productName = Object.keys(productSelected)[0];
        prName.innerText = productName;
        prPrice.innerText = Object.values(productSelected)[0].startingPrice;
        bodyPrName.innerText = productName;

        //create radio btns
        let model = document.querySelector('.model-rem');
        let modelIndex = 0;
        for (items in productSelected){
            //create radio btns for MODEL
            let modelDiv = document.createElement('div');
            modelDiv.classList.add('model-form', 'my-3', 'model-rem');
            //input
            let modelInput = document.createElement('input');
            modelInput.classList.add('model-form-input', 'd-none', 'radio-btn');
            modelInput.setAttribute('type','radio');
            modelInput.setAttribute('name','modelRadio');
            modelInput.setAttribute('id', `model${modelIndex}`);
            // modelInput.setAttribute('checked','');
            //label
            let modelLabel = document.createElement('label');
            modelLabel.classList.add('model-form-label', 'label');
            modelLabel.setAttribute('for', `model${modelIndex}`);
            //label div
            let modelText = document.createElement('div');
            modelText.classList.add('modelOptions', 'd-flex', 'justify-content-between', 'align-items-center', 'px-3');
            //label div text
            let modelName = document.createElement('span');
            modelName.innerHTML = `${productSelected[items].name}` + "<br>" + `<span class='model-name-display'>${productSelected[items].display}</span>`;
            modelName.classList.add('model-name', 'align-middle');
            //label div price
            let modelPrice = document.createElement('span');
            modelPrice.innerText = `NT$${productSelected[items].startingPrice}  起`;
            modelPrice.classList.add('model-price');
            modelDiv.appendChild(modelInput);
            modelDiv.appendChild(modelLabel);
            modelLabel.appendChild(modelText);
            modelText.appendChild(modelName);
            modelText.appendChild(modelPrice);
            model.appendChild(modelDiv);
            modelIndex++;
        }
        let fIndex = 0;
        let colorArray = [];
        colorArray = Object.values(productSelected)[0].finish;

        let fHead = document.createElement('h2');
        fHead.innerText = "選擇外觀。"
        finishes.appendChild(fHead);
        finishes.classList.add('disabled');
        
        let cHead = document.createElement('h2');
        cHead.innerText = "選擇儲存容量。"
        capacity.appendChild(cHead);
        capacity.classList.add('disabled');

        for (f in colorArray) {
            let fDiv = document.createElement('div');
            fDiv.classList.add('col-6', 'finish-form-check', 'my-3');
            let fInput = document.createElement('input');
            fInput.classList.add('finish-form-input', 'd-none', 'radio-btn');
            fInput.setAttribute('type', 'radio');
            fInput.setAttribute('name', 'finishRadio');
            fInput.setAttribute('id', `finish${fIndex}`)
            // fInput.disabled = true;

            let fLabel = document.createElement('label');
            fLabel.classList.add('finish-btn', 'label');
            fLabel.setAttribute('for', `finish${fIndex}`);
            let fBubble = document.createElement('img');
            fBubble.classList.add('finish-img');
            fBubble.setAttribute('src', `${colorArray[f].bubble}`);
            let fName = document.createElement('div');
            fName.classList.add('finish-name');
            fName.innerText = colorArray[f].color;

            fLabel.appendChild(fBubble);
            fLabel.appendChild(fName);
            fDiv.appendChild(fInput);
            fDiv.appendChild(fLabel);
            finishes.appendChild(fDiv);
            fIndex++;
        }


        let cIndex = 0;
        let capArray = [];
        capArray = Object.values(productSelected)[0].capacity;
        for(c in capArray){
            let cDiv = document.createElement('div');
            cDiv.classList.add('col-6', 'cap-form-check', 'my-3');
            let cInput = document.createElement('input');
            cInput.classList.add('cap-form-input', 'd-none', 'radio-btn');
            cInput.setAttribute('type', 'radio');
            cInput.setAttribute('name', 'capRadio');
            cInput.setAttribute('id', `capacity${cIndex}`);
            let cLabel = document.createElement('label');
            cLabel.classList.add('cap-btn', 'model-form-check-label', 'label');
            cLabel.setAttribute('for', `capacity${cIndex}`);
            let capSize = document.createElement('div');
            capSize.classList.add('cap-size');
            let gbNum = capArray[c].size.slice(0, 3);
            capSize.innerHTML = `${gbNum}<span class="gb">GB</span>`;
            let capPrice = document.createElement('div');
            capPrice.classList.add('cap-price');
            capPrice.innerText = `NT${capArray[c].price} 起`;
            cDiv.appendChild(cInput);
            cDiv.appendChild(cLabel);
            cLabel.appendChild(capSize);
            cLabel.appendChild(capPrice);
            capacity.appendChild(cDiv);
            cIndex++;
        }
        //set default pic
        let productPic = document.createElement('img');
        productPic.classList.add('display-pic');
        productPic.setAttribute('src', Object.values(productSelected)[0].modelImage);

        picDiv.appendChild(productPic);
        let modelBtns = document.querySelectorAll('.model input');
        let picChange = document.querySelector('.display-pic');

        let modelSelectedIndex;
        let finishSelectedIndex;
        let capSelectedIndex;

        modelBtns.forEach((item, index)=> {
            item.addEventListener('click', function() {
                //if finish has disabled class
                if (finishes.classList.length == 3) {
                    let wordCut = document.querySelectorAll('.cap-price');
                    for (let i = 0; i < wordCut.length; i++) {
                        wordCut[i].innerText = wordCut[i].innerText.slice(0, -1);
                    }
                }
                //if cap has disabled ==>. changes phone size
                else if(finishes.classList.length > 2 || capacity.classList.length > 2) {
                    picChange.setAttribute('src', Object.values(productSelected)[index].modelImage)
                } 
                //if cap has not been selected
                else if (capSelectedIndex!== undefined){
                    productPrice.innerText = `NT$${Object.values(productSelected)[index].capacity[capSelectedIndex].price}`;
                    picChange.setAttribute('src', Object.values(productSelected)[index].finish[finishSelectedIndex].image);
                }
                //if cap has been selected => change 
                else{
                    picChange.setAttribute('src', Object.values(productSelected)[index].finish[finishSelectedIndex].image);
                }
                if (capacity.classList.length < 3 && capSelectedIndex!== undefined) {
                    checkoutPrice.innerText = `NT$${Object.values(productSelected)[index].capacity[capSelectedIndex].price}`;
                }
                modelSelectedIndex = index;
                let changeCapPrice = document.querySelectorAll('.cap-price');
                changeCapPrice.forEach((item, index)=>{
                    item.innerText = `NT$${Object.values(productSelected)[modelSelectedIndex].capacity[index].price}`;
                })

                if (capSelectedIndex == undefined) {
                    productPrice.innerText = `NT$${Object.values(productSelected)[modelSelectedIndex].startingPrice} 起`;
                } else {productPrice.innerText = `NT$${Object.values(productSelected)[index].capacity[capSelectedIndex].price}`}

                modelSelected = Object.values(productSelected)[index];
                finishes.classList.remove('disabled');
            })
        })
        let finishBtns = document.querySelectorAll('.finish input');
        finishBtns.forEach((item, index)=> {
            item.addEventListener('click', () => {
                picChange.setAttribute('src', modelSelected.finish[index].image);
                capacity.classList.remove('disabled');
                finishSelectedIndex = index;
            })
        })
        // let checkoutDisabled = document.querySelector('.disabled');
        let capacityBtns = document.querySelectorAll('.capacity input');
        capacityBtns.forEach((item, index)=> {
            item.addEventListener('click', () => {
                productPrice.innerText = `NT$${Object.values(productSelected)[modelSelectedIndex].capacity[index].price}`;
                capSelectedIndex = index;
                if (bckGround.classList.length > 3) {
                    bckGround.classList.add('bckGround');
                    bckGround.classList.remove('disabled');
                    checkoutBtnText.innerText = "加入購物袋";
                }
                checkoutPrice.innerText = `NT$${Object.values(productSelected)[modelSelectedIndex].capacity[index].price}`;
                
            })
        })

    }
})
.catch(ex =>{
    console.log(ex);
})