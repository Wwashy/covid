$(document).ready(()=>{
    // home button
    $('#home_btn').click(()=>{
        window.location.href="/feed";
        });
    //kenya stats
    $('#kenya_btn').click(()=>{
        $('#kenya').css("display","block");
        $('#global').css("display","none");
        $('#about').css("display","none");
        $('#spread').css("display","none");
        $('#prevention').css("display","none");
        $('#cure').css("display","none");
        $('#contact').css("display","none");
    });
    //global
    $('#global_btn').click(()=>{
        $('#kenya').css("display","none");
        $('#global').css("display","block");
        $('#about').css("display","none");
        $('#spread').css("display","none");
        $('#prevention').css("display","none");
        $('#cure').css("display","none");
        $('#contact').css("display","none");
    });
    //about button
    $('#about_btn').click(()=>{
        $('#about').css("display","block");
        $('#kenya').css("display","none");
        $('#global').css("display","none");
        $('#prevention').css("display","none");
        $('#cure').css("display","none");
        $('#contact').css("display","none");
    });
    //prevention button
    $('#prevention_btn').click(()=>{
        $('#kenya').css("display","none");
        $('#global').css("display","none");
        $('#about').css("display","none");
        $('#prevention').css("display","block");
        $('#cure').css("display","none");
        $('#contact').css("display","none");
    });
    //spread button
    $('#spread_btn').click(()=>{
        $('#kenya').css("display","none");
        $('#global').css("display","none");
        $('#about').css("display","none");
        $('#spread').css("display","block");
        $('#prevention').css("display","none");
        $('#cure').css("display","none");
        $('#contact').css("display","none");
    });

    //cure
    $('#cure_btn').click(()=>{
        $('#kenya').css("display","none");
        $('#global').css("display","none");
        $('#about').css("display","none");
        $('#spread').css("display","none");
        $('#prevention').css("display","none");
        $('#cure').css("display","block");
        $('#contact').css("display","none");
    });
    //contact
    $('#contact_btn').click(()=>{
        $('#kenya').css("display","none");
        $('#global').css("display","none");
        $('#about').css("display","none");
        $('#spread').css("display","none");
        $('#prevention').css("display","none");
        $('#cure').css("display","none");
        $('#contact').css("display","block");
    });
});