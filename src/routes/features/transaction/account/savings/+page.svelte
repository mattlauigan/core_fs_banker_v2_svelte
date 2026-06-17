<script>
  import Card from "$components/primitives/Card.svelte";

  import CardContainer from "$components/primitives/CardContainer.svelte";

  import CardHeader from "$components/primitives/CardHeader.svelte";
  import User from "$components/User.svelte";
</script>

<CardContainer>
  <CardHeader label="Savings Account" />
  <Card>
    <User />
    <Card>
      <User />
    </Card>
  </Card>
</CardContainer>
<!-- <script lang="ts">
  import Ritals from "$components/composites/Ritals.svelte";

  




</script>


<Ritals/> -->
