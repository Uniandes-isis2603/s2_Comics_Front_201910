import { Component, OnInit, Output } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from "@angular/forms";
import { CompradorService } from "../../Comprador/comprador.service";
import { ToastrService } from "ngx-toastr";
import { EventEmitter } from "events";
import { Comprador } from "../../Comprador/comprador";
import { Vendedor } from "../../vendedor/vendedor";
import { VendedorService } from "../../vendedor/vendedor.service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
const API_URL = '../../../assets/foto_2.json';

@Component({
    selector:'app-form',
    templateUrl: 'formulario.component.html',
    styleUrls: ['formulario.component.css']
})

export class FormularioComponent implements OnInit
{
    /**
     * Formulario de registro
     */
    registrationForm : FormGroup;

    /**
     * Booleano que me permite saber si el fomrmulario ha sido enviado
     */
    isSubmitted: boolean = false;

    /**
     * Grupo que representa los roles de usuario
     */
    checkboxGroup: FormGroup;

    /**
     * Los valores de los roles
     */
    values: Array<String> = ["Comprador", "Vendedor"];

    /**
     * Rol seleccionado, puede ser más de uno
     */
    selectedRole = [];

    /**
     * Booleano que me determina si hay error seleccionando los roles de usuario
     */
    valuesError: Boolean = true;

    /**
     * El comprador que se va a crear en la base de datos
     */
    comprador:Comprador;

    /**
     * El vendedor que se va a crear en la base de datos
     */
    vendedor: Vendedor;

    /**
     * El evento que se emite si hubo exito al crear los objetos en la base de datos.
     */
    @Output() update = new EventEmitter();

    /**
     * Construcotr de la clase.
     * @param formBuilder Objeto que crea el formulario 
     * @param compradorService Servicio de peticiones del comprador
     * @param vendedorService Servicio de peticiones del vendedor.
     * @param toastrService 
     */
    constructor(private formBuilder: FormBuilder,
        private compradorService:CompradorService,
        private vendedorService: VendedorService,
        private toastrService: ToastrService,
        private router:Router,
        private httpClient:HttpClient)
    {
        this.comprador = new Comprador();
        this.vendedor = new Vendedor();
        this.registrationForm = this.formBuilder.group({
            id: new FormControl(0),
            nombre : new FormControl('',[
                Validators.required,
                Validators.minLength(3),  
                Validators.maxLength(30),  
                Validators.pattern('^[a-zA-Z ]*$')
            ]),
            alias: new FormControl('',[
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(30)
            ]),
            correoElectronico:new FormControl('', [
                Validators.required,
                Validators.pattern(/^([\w\-\.]+)@((\[([0-9]{1,3}\.){3}[0-9]{1,3}\])|(([\w\-]+\.)+)([a-zA-Z]{2,4}))$/)
            ]),
            password: new FormControl('',[
                Validators.required,
                Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,10}$/)
            ]),
            intereses: new FormControl(),
            foto : new FormControl()
        });

        this.checkboxGroup = this.formBuilder.group({
            myValues: this.addValuesControls()
        });
    }
    
    imagenes : string[];

    /**
     * Función que asigna la ruta de la imagen que se selecciona en el formulario
     * @param url 
     */
    funcion(url:string)
    {
        this.registrationForm.get('foto').setValue(url);
    }

    /**
     * Cargar las imagenes de un archivo JSON a través de una peticion HTTP
     */
    cargarImagenes():void
    {
       this.httpClient.get<string[]>(API_URL).subscribe(imagenes => 
        {
            this.imagenes = imagenes;
        });
    }

    /**
     * Añade los valores a los controles.
     */
    addValuesControls()
    {
        const arr = this.values.map(element =>
            {
                return this.formBuilder.control(false);
            });
        return this.formBuilder.array(arr);
    }

    /**
     * determina el rol que se escogió y se agrega a un arreglo
     */
    get valuesArray()
    {
        return <FormArray>this.checkboxGroup.get('myValues');
    }

    /**
     * Obtiene el rol seleccionado
     */
    getSelectedRoleValue()
    {
        this.selectedRole = [];
        this.valuesArray.controls.forEach((control, i) =>
        {
            if(control.value)
            {
                this.selectedRole.push(this.values[i]);
            }
        });
        this.valuesError = this.selectedRole.length > 0 ? false : true;
    }

    /**
     * Verifica los si los valores fueron seleccionados o no. Al menos uno debe ser seleccionado
     */
    checkValuesChecked()
    {
        let flg = false;
        this.valuesArray.controls.forEach(control =>
            {
                if(control.touched)
                {
                    flg = true;
                }
            });
        return flg;      
    }

    /**
     * Funcion que se activa cuando se envía el formulario de creacion
     */
    onRegistrationFormSubmit()
    {  
        this.isSubmitted = true;  
        
        if(this.registrationForm.valid)
        {      
            this.comprador = Object.assign({}, this.registrationForm.value);
            this.vendedor = Object.assign({}, this.registrationForm.value);
            console.log(this.comprador.foto);
            

            for (var i = 0; i < this.selectedRole.length; i++) {
                if (this.selectedRole[i] == "Comprador") {
                    this.compradorService.createComprador(this.comprador).subscribe(()=>
                    {
                        this.registrationForm.reset();
                        this.update.emit('');
                        this.toastrService.success("El comprador fue creado exitosamente", 'comprador añadido');
                    }, err =>
                    {
                        this.toastrService.error(err, 'Error');
                    });
                }
                else if (this.selectedRole[i] == "Vendedor") {
                    this.vendedorService.createVendedor(this.vendedor).subscribe(()=>
                    {
                        this.registrationForm.reset();
                        this.update.emit('');
                        this.toastrService.success("El vendedor fue creado exitosamente", 'vendedor añadido');
                    },
                    err =>
                    {
                        this.toastrService.error(err, "Error");
                    });
                }
            }
        }
    }

    /**
     * Funcion que se activa al momento de cargar la pagina.
     */
    ngOnInit()
    {
        this.comprador = new Comprador();
        this.vendedor = new Vendedor();
        this.cargarImagenes();
    }
}