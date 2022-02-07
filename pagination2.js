var data = fetch('https://gist.githubusercontent.com/rvsp/add40254aa126f045837fa5b51f47f1f/raw/4d724bfabf4cce7379a386e23bef6576ab99a2f9/pagination.json').then(response => response.json())

var tbody = document.getElementById('tbody');
var tr = () => document.createElement('tr');
var btn = () => document.createElement('tr');
var td = () => document.createElement('td');
var nextBtn = document.getElementById('next');
var prevBtn = document.getElementById('prev');
var firstBtn = document.getElementById('first');
var lastBtn = document.getElementById('last');
var currentPage = document.getElementById('currentPage');
var totalPage = document.getElementById('totalPage');
var pageCon = document.getElementById('pageBtns');


class Pagination{
    constructor(){
        this.firstIndex = 0;
        data.then(data=>{
            var numOfBtn = data.length/10;
            for(let i=0; i<numOfBtn;i++){
                var pageBtn = btn();
                pageBtn.setAttribute('onClick',`page.setPage(${i})`);
                pageBtn.setAttribute('class','btn btn-dark');
                pageBtn.innerHTML = i + 1;
                pageCon.append(pageBtn);

            }
        }).catch(err => console.log(err))
    }

    buttons(){
        data.then(data=>{
            if(this.firstIndex < 10 && this.firstIndex>=0){
                nextBtn.style.display = block;
            }
            else{
                nextBtn.style.display = none;
            }
        
        if(this.firstIndex>10 && this.firstIndex<data.length){
            prevBtn.style.display = block;
        }
        else{
            prevBtn.style.display = none;
        }
    }).catch(err => console.log(err))
}
display(){
    data.then(data=>{

        
        currentPage.innerHTML = (this.firstIndex/10) +1;

        tbody.innerHTML = '';
        for(let i = this.firstIndex;i<this.firstIndex+10;i++){
            var row = tr();
            var rowData = [td(),td(),td()];
            rowData[0].innerHTML = data[i].id;
            rowData[1].innerHTML = data[i].name;
            rowData[2].innerHTML = data[i].email;
            row.append(...rowData);
            tbody.append(row);

        }


    }).catch(err => console.log(err));
}
    next(){
        this.firstIndex = this.firstIndex + 10;
        this.display()
    }
    prev(){
        this.firstIndex = this.firstIndex - 10;
        this.display()
    }

    setPage(num){
        this.firstIndex = num*10;
        this.display();
    }
    lastPage(){
        data.then(data=>{
            this.setPage((data.length/10)-1)
        }).catch(err =>console.log(err));
    }


}

var page = new Pagination();
page.display();

firstBtn.addEventListener('click',()=>page.setPage(0))
lastBtn.addEventListener('click',()=>page.lastPage());
nextBtn.addEventListener('click',()=>page.next());
prevBtn.addEventListener('click',()=>page.prev());