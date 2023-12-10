export interface VehicleData {
  Id: string;
  Name: string;
  Abrv: string;
  Make: {
    Id: string;
    Name: string;
    Abrv: string;
  };
}