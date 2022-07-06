import { ComponentScript } from "./ComponentScript";

export default abstract class MonoBehaviour extends ComponentScript {

  public abstract Awake();
  
  public abstract Start();
    
  public abstract Update();

  public abstract LateUpdate();

  public abstract FixedUpdate();
     
  public abstract PhysicsUpdate();
}