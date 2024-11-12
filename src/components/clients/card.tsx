import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { BodyBiotype } from "../../models/Client";
import dayjs from "dayjs";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface ClientCardProps {
  client: {
    _id?: string;
    name: string;
    email: string;
    phone: string;
    birthDate: Date;
    cpf: string;
    bodyBiotype: BodyBiotype;
  };
}

export default function ClientCard({ client }: ClientCardProps) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent className="flex flex-col gap-2">
        <div className="flex flex-row">
          <Typography variant="h5" component="div">
            {client.name}
          </Typography>
          <div className="flex-grow flex flex-row justify-end">
            <IconButton
              onClick={() => console.log(client._id)}
            >
              <EditIcon fontSize="small"/>
            </IconButton>
            <IconButton
              onClick={() => console.log(client._id)}
            >
              <DeleteIcon fontSize="small"/>
            </IconButton>
          </div>
        </div>

        <div>
          <Typography variant="body2" color="text.secondary">
            Email: {client.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Celular: {client.phone}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Data Nascimento: {dayjs(client.birthDate).format("DD/MM/YYYY")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            CPF: {client.cpf}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Biotipo Corporal: {client.bodyBiotype}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
