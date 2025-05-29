import type { FormReqBody } from "../types";
    
    const form = document.querySelector('form');
    form?.addEventListener('submit', (e)=>{
        e.preventDefault();

        const body: FormReqBody = {
                title: ((e.target as HTMLFormElement).elements.namedItem('title') as HTMLInputElement).value, 
                author: ((e.target as HTMLFormElement).elements.namedItem('author') as HTMLInputElement).value, 
                content: ((e.target as HTMLFormElement).elements.namedItem('content') as HTMLInputElement).value,
        };
        


        fetch('/api/post', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(body),
        }).then(res => {
            if(res.redirected){
                // window.location.href = res.url;
                location.replace(res.url);
            }
            // res.json(); 
            console.log(res.status);
        });
    });

