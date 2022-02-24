<template>
  <div>
    <label for="excel">{{ title }}</label>
    <br />
    <input type="file" id="excel" @input="onInput($event)" />
    <br />
    <div class="container" v-if="result.length > 0">{{ result }}</div>
  </div>
</template>

<script lang="ts">
import XLSX from "xlsx";
import { Vue } from "vue-class-component";
import { University } from "../classes/University";
import { IUniversity } from "../interfaces/IUniversity";
import { IFaculty } from "../interfaces/IFaculty";
import { Faculty } from "../classes/Faculty";
import { ICaree } from "../interfaces/ICaree";
import { Caree } from "../classes/Carees";

export default class Conversor extends Vue {
  public title = "conversor";
  public result: string[] = [];

  onInput(event: any): void {
    if (event.target.files[0] !== undefined) {
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.onload = function (this: any, e: any) {
        let data = new Uint8Array(e.target.result);
        let workbook = XLSX.read(data, { type: "array" });
        let worksheet = workbook.Sheets[workbook.SheetNames[0]];
        let sheet: string[] = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
        }) as string[];
        let [headers, ...universities] = sheet;
        let dataset = this.parseFile(universities);
        this.result = dataset;
      }.bind(this);
      reader.readAsArrayBuffer(file);
    }
  }

  parseFile(sheet: string[]): Array<IUniversity> {
    let universities: IUniversity[] = [];

    sheet.forEach(([caree, university, faculty, department]: string) => {
      //checkeo si la universidad existe y obtengo su posición en el array
      let position: number = universities.findIndex(
        (u: IUniversity) =>
          u["title"] === university &&
          u["provincia"] === department
      );
      if (position !== -1) {
        let u: IUniversity = universities[position];
        //checkeo si la facultad actual pertenece a la university
        let index = u["Facultades"].findIndex(
          (f: IFaculty) => f["title"] === faculty
        );
        if (index !== -1) {
          //se fija la carrera y si no esta la agrega
          let isINCarreesArray: boolean = u["Facultades"][index][
            "Carreras"
          ].some((c: ICaree) => c["title"] === caree);
          if (!isINCarreesArray) {
            u["Facultades"][index]["Carreras"].push(new Caree(caree));
          }
        }
        //si facultad no existe la crea
        if (index === -1)
          u["Facultades"].push(
            new Faculty(faculty, [ new Caree(caree) ])
          );
      }
      //si la universidad no existe la crea
      if (position === -1) {
        universities.push(
          new University(university, department, [new Faculty(faculty, [ new Caree(caree) ])])
        );
      }
    });
    return universities;
  }
}
</script>

<style>
.container {
  background-color: black;
  color: rgb(0, 207, 79);
  text-align: center;
  padding: 20px;
}
</style>
