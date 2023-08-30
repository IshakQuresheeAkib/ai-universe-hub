const loadData = async (seeMore) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
    const data = await res.json();
    const software = data.data.tools;
    console.log(software);
    softwareData(software,seeMore);
}

const softwareData = (software,seeMore) => {
    const cardContainer = document.getElementById('card-container');
    const seeMoreButton = document.getElementById('see-more-button');
    cardContainer.innerHTML = '';
    // showing 6 cards initially when showMore button isn't pressed
    if (!seeMore) {
        software = software.slice(0,6);
    }else{
        seeMoreButton.classList.add('hidden')
    }
    software.forEach((item)=>{      
        const div = document.createElement('div');
        const featuresList = document.createElement('ol');
        featuresList.innerHTML = '';
        item.features.forEach(element => {
            featuresList.innerHTML += `<li class="list-decimal">${element}</li>`
           })
        div.classList = `rounded-xl shadow-sm border text-left p-5 space-y-4`
        div.innerHTML = `
            <figure class="h-60">
                <img src=${item.image} alt=${item.name} class="rounded-xl h-full w-full" />
            </figure>
            <div class="space-y-2 border-b-2 h-44">
                <h2 class="font-semibold text-2xl">Features</h2>
                ${featuresList.innerHTML}
            </div>
            <div class="flex justify-between items-center">
                <div class="space-y-6">
                    <h2 class="font-semibold text-3xl">${item.name}</h2>
                    <i class="fa-solid fa-calendar-days text-[#585858]"></i>
                    <span class="text-md font-medium text-[#585858]  pl-2">${item.published_in}</span>
                </div>
                <div>
                    <button onclick="showModal('${item.id}')" class="btn rounded-full border-none text-[#EB5757] bg-[#FEF7F7]"><i class="fa-solid fa-angles-right"></i></button>
                </div>
            </div>
        `;
        console.log();
        cardContainer.appendChild(div);
    })
}

const showModal = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await res.json();
    const detailsInfo = data.data;
    const pricing = detailsInfo.pricing;
    console.log(detailsInfo);
    modalHandler();
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = '';
    modalContainer.innerHTML = `
    <div class="rounded-xl shadow-sm text-left px-5 py-8 space-y-8 m-4 flex-1 bg-[#EB57570D] border border-[#EB5757]">
        <h1 class="text-2xl font-semibold">${detailsInfo.description}</h1>
        <div class=" text-center flex md:flex-row flex-col justify-center gap-8 items-stretch max-w-full" id="pricing-container">
        <p class="bg-white px-8 text-md font-semibold rounded-2xl flex-1 flex items-center justify-center text-success">${detailsInfo?.pricing ? pricing[0].price + '<br>' + pricing[0].plan: `Free Of <br> Cost/ <br> Basic`}</p>
        <p class="bg-white px-8 text-md font-semibold rounded-2xl flex-1 flex items-center justify-center text-warning">${detailsInfo?.pricing ? pricing[1].price + '<br>' + pricing[1].plan: `Free Of <br> Cost/Pro`}</p>
        <p class="bg-white px-8 py-2 text-md font-semibold rounded-2xl flex-1 flex items-center justify-center text-error">${detailsInfo?.pricing ? pricing[2].price.slice(0,10) + '<br>' + pricing[2].plan: `Free Of Cost/ <br> Enterprise`}</p>
        </div>
        <div class="flex md:flex-row flex-col justify-between items-start gap-8 ">
            <div class="">
                <h1 class="text-2xl font-semibold">Features</h1>
                <ul class="list-inside list-disc text-[#585858]" id="features"></ul>
            </div>
            <div class="">
                <h1 class="text-2xl font-semibold">Integrations</h1>
                <ul class="list-inside list-disc text-[#585858]" id="integrations"></ul>
            </div>
        </div>
    </div>
    <div class="rounded-xl shadow-sm border p-5 space-y-4 m-4 flex-1">
        <figure class="relative">
        <img src=${detailsInfo.image_link[0]} alt="Shoes" class="rounded-xl mx-auto" />
        
        <div class="bg-red-500 w-32 flex items-center justify-center h-8 top-2 right-1 absolute rounded-xl text-white text-sm font-semibold" id="accuracy-box"></div>
        </figure>
        <div class="space-y-4 text-center">
          <h2 class="font-semibold text-2xl">${detailsInfo.input_output_examples ? detailsInfo.input_output_examples[0].input :"Can you give any example?"}</h2>
          <p class="text-md font-normal text-[#585858]">${detailsInfo.input_output_examples ? detailsInfo.input_output_examples[0].output :"No! Not Yet! Take a break!!!"}</p>
        </div>
    </div>
    `;
    const features = document.getElementById('features');
    const integrations = document.getElementById('integrations');
    features.innerHTML = '';
    integrations.innerHTML = '';
    for (const element in detailsInfo.features) {
        const value = detailsInfo.features[element];
        const valueName = value.feature_name;
        features.innerHTML += `<li>${valueName}</li>`;
    }
    detailsInfo.integrations ? (detailsInfo?.integrations?.forEach(element => {
        integrations.innerHTML += `<li>${element}</li>`;
    })) : integrations.innerHTML = "No data Found" ;

    // accuracy box
    const accuracyBox = document.getElementById('accuracy-box');
    detailsInfo.accuracy.score ? accuracyBox.innerHTML = `<p>${(detailsInfo.accuracy.score * 100).toFixed(0)}% accuracy</p>` : accuracyBox.classList.add('hidden');
    

    // const pricingContainer = document.getElementById('pricing-container');
    // pricingContainer.innerHTML='';
    // detailsInfo.pricing.forEach(item => {
    //     pricingContainer.innerHTML += `
    //     <p class="bg-white p-8 text-xs rounded-2xl flex-1 flex items-center justify-center">${item.price} <br>${item.plan}</p>
    //     `;
    // })

    // lengthy way of creating element

    // detailsInfo.pricing.forEach(item => {
    //     const newPara = document.createElement('p');
    //     newPara.classList = `bg-white p-8 text-xs rounded-2xl flex-1 flex items-center justify-center`;
    //     newPara.innerText = `${item.price}
    //     ${item.plan}`;
    //     pricingContainer.appendChild(newPara);
    // })
}



// open Modal
const modalHandler = () => {
    
    my_modal_3.showModal();
}






// see more button handler
const seeMoreHandler = (seeMore) => {
    loadData(seeMore);
}

const seeMore = () => {
    seeMoreHandler(true);
}



loadData();
//                     