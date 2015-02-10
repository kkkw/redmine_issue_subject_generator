$(function(){
    $('#issue-form.new_issue').on('submit',function(){
        var text = $('#issue_subject').val();
        if(!text){
            return true;
        }
        var regexp = /###([0-9]*)###/g;
        var result;
        var results = [];
        while(result = regexp.exec(text)){
          results.push(result[1]);
        }
        $.each(results,function(){
          var text = $('#issue_subject').val();
          var elm = $('#issue_custom_field_values_' + this);
            if(elm.length === 0 || !elm.val()){
                return true;
            }
            var convert = text.replace('###' + this + '###',elm.val());
            $('#issue_subject').val(convert);
        });
    });
    
});

