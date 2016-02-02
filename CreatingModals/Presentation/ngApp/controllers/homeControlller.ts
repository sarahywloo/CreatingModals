namespace CreatingModals.Controllers {
    
    export class HomeController {

        public modalInstance;

        constructor(private $uibModal, private $timeout: ng.ITimeoutService, private $location) { }

        //method called openModal, that takes no arguements and returns void
        public showModal(): void {
            this.modalInstance = this.$uibModal.open({
                templateUrl: '/Presentation/ngApp/views/modalLogin.html',
                controller: CreatingModals.Controllers.ModalController,
                controllerAs: 'controller',
                size: 'sm',
                backdrop: 'static',
                //resolve: {
                //    names: function () {
                //        ['cat', 'dog', 'fish']
                //    }
                }
            });

            //create a promise just like in a $http.get()
            this.modalInstance.result
                .then((reason) => {
                    console.log("THEN");
                    console.log("reason");
                })
                .catch((reason) => {
                    console.log("CATCH");
                    console.log("reason");
                });

            this.$timeout(() => {
                this.modalInstance.dismiss('Oppsie! You took too long!');
            }, 8000);
        }
    }
    export class CreatingModalsController {
        constructor(private $uibModalInstance, public names) { }

        public login(name) {
            //this.$uibModalInstance.close('This was from the modal');
            this.$uibModalInstance.close(name);
        }
    }
}