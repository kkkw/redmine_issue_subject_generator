(function($){

    "use strict";

    var SubjectGenerator = {
        
        PLACE_HOLDER:'###',
        subject:null,
        regexp:null,
        place_holders:[],
        
        initialize:function(){
            var regexp = this.wrapPlaceHolder('(.*?)');
            this.regexp = new RegExp(regexp,'g');
            return this;
        },
        
        setSubject:function(subject){
            this.subject = subject;
        },
        
        analyze:function(){
            var result;
            while(result = this.regexp.exec(this.subject)){
              this.place_holders.push(result[1]);
            }
        },
        
        getPlaceHolders:function(){
            return this.place_holders;
        },
        
        replace:function(substr,newSubstr){
            this.subject = this.subject.replace(
                this.wrapPlaceHolder(substr),
                newSubstr
            );
        },
        
        wrapPlaceHolder:function(str){
            return this.PLACE_HOLDER + str + this.PLACE_HOLDER;
        },
        
        getSubject:function(){
            return this.subject;
        }
        
    };
    
    var IssueSubjectGenerator = {

        CUSTOM_FIELD_ID:'issue_custom_field_values_',
        subject:null,
        subject_generator:null,
        form:null,
        selectors:[],
        
        initialize: function() {
            this.subject = $('#issue_subject');
            this.subject_generator = SubjectGenerator.initialize(self.subject.val());
            return this;
        },
        
        bind:function(){
            var self = this;
            $('form.new_issue').on('submit',function(){
                self.subject_generator.setSubject(self.subject.val());
                self.makeSelectors();
                self.generate();
                self.subject.val(self.subject_generator.getSubject());
            });
        },
        
        makeSelectors:function(){
            var place_holders,self;
            this.subject_generator.analyze();
            place_holders = this.subject_generator.getPlaceHolders();
            self = this;
            $.each(place_holders,function(){
                var place_holder,selector;
                var parsedInt = parseInt(this,10);
                if(!isNaN(parsedInt)){
                    place_holder = parsedInt.toString();
                    selector = self.CUSTOM_FIELD_ID + parsedInt;
                }else{
                    place_holder = selector = this.toString();
                }
                self.selectors.push({
                    place_holder:place_holder
                    ,selector:selector
                });
            });
        },
        
        generate:function(){
            var self = this;
            $.each(this.selectors,function(){
                var elm = $('#' + this.selector);
                if(elm.length === 0 || !elm.val()){
                    return true;
                }
                self.subject_generator.replace(this.place_holder,elm.val());
            });
        },
    };
    

    $(document).ready(function(){
        IssueSubjectGenerator.initialize().bind();
    });


}(
 window.jQuery
));
