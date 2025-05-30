import type { FormReqBody, UserReqBody } from "../types";
    
    const postForm = document.querySelector('.postForm');
    postForm?.addEventListener('submit', (e)=>{
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


        const userForm = document.querySelector('.userForm');
        userForm?.addEventListener('submit',(e)=> {
            e.preventDefault();


            const body: UserReqBody = {
                name: ((e.target as HTMLFormElement).elements.namedItem('name') as HTMLInputElement).value,
                email: ((e.target as HTMLFormElement).elements.namedItem('email') as HTMLInputElement).value,
                password: ((e.target as HTMLFormElement).elements.namedItem('password') as HTMLInputElement).value,
            };
            fetch('/api/user', { 
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        }).then(res => {
            if(res.redirected){
                location.replace(res.url);
            }
        });
    });
